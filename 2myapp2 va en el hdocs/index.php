<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . './vendor/autoload.php';

$app = AppFactory::create();

function getDB(){
    $dbhost = "localhost";
    $dbname = "2myapp2";
    $dbuser = "root";
    $dbpass = "";
    $mysql_conn_string = "mysql:host=$dbhost;dbname=$dbname";
    $dbConnection = new PDO($mysql_conn_string, $dbuser, $dbpass);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("que se diceeeeeeeeeeee!");
    return $response;
});

            //codigo que envio el profesor para pegar (consulta de datos)

$app->get('/consultaDatos', function ($request, $response, $args) {  //Defino los servicios
	try{
		$db =  getDB(); //Carga los datos
		$sth = $db->prepare("SELECT datNombre, datLanzamiento, datGenero, datImagen, datDescripcion from datos");//Consulta
		$sth->execute(); //Ejecutamos la consulta
		$test = $sth->fetchAll(PDO::FETCH_ASSOC);//Guardar los resultados de la consulta
		//Verificar si se ha cargado algo
if($test){
			$response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
			$db = null;//Cerrar la conexion con la base de datos
		}
		else{
			$response->getBody()->write('{"error":"error"}');
		}
}catch(PDOException $e){
			$response->getBody()->write('{"error":{"texto":'.$e->getMessage().'}}'); //En caso que se halla generado algún error
		}
    return $response
    ->withHeader('Content-Type', 'application/json');
});

$app->post('/insertarDatos', function ($request, $response, $args) {  //Defino los servicios  $app->post('/updateVeces', function ($request, $response)
	try{
		//$data = $request->getParsedBody(); //Recupero los datos  getParams()
		$json = $request->getBody();
		$data = json_decode($json, true);
		//echo 'Codigo:', $data['nombre'],' si? ';
		$db =  getDB(); //Carga los datos
		$sth = $db->prepare("INSERT INTO datos
							(datNombre, datLanzamiento,datGenero,datImagen,datDescripcion) 
							VALUES (,?,?,?,?,?)");//Insertamos información
							
		$sth->execute(array($data['datNombre'], $data['datLanzamiento'], $data['datGenero'],$data['datImagen'], $data['datDescripcion'],)); //Sustituimos y ejecutamos la consulta
		$response->getBody()->write('{"error":"ok"}'); //Cuando la conexión halla terminado
		
	}catch(PDOException $e){

			$response->getBody()->write('{"error":{"texto":'.$e->getMessage().'}}'); //En caso que se halla generado algún error
		}
    return $response
    ->withHeader('Content-Type', 'application/json');
});
$app->post('/removeDatos', function ($request, $response, $args) {
    try {
        $json = $request->getBody();
        $data = json_decode($json, true);
        $db =  getDB();
        $sth = $db->prepare("DELETE FROM datos WHERE datId = ?");
        $sth->execute(array($data['datId']));
        $response->getBody()->write('{"error":"ok"}');
    } catch (PDOException $e) {
        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}');
    }
    return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/updateDatos', function ($request, $response, $args) {
    try {
        $json = $request->getBody();
        $data = json_decode($json, true);
        $db =  getDB();
        $sth = $db->prepare("UPDATE datos SET datNombre = ?, datLanzamiento = ?, datGenero = ? ,datImagen = ?,datDescripcion WHERE datId = ?");
        $sth->execute(array($data['datNombre'], $data['datLanzamiento'], $data['datGenero'], $data['datImagen'], $data ['datDescripcion'], $data['datId']));
        $response->getBody()->write('{"error":"ok"}');
    } catch (PDOException $e) {
        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}');
    }
    return $response->withHeader('Content-Type', 'application/json');
});	
$app->run();