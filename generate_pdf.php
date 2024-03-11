<?php
// Recebe os dados da assinatura e do termo
$data = json_decode(file_get_contents('php://input'), true);
$name = isset($data['username']) ? $data['username'] : '';

$date = date('d/m/Y');
$daten = date('Y-m-d');

// Inclui a biblioteca DOMPDF
require_once 'dompdf/autoload.inc.php';

// Dompdf vai usar opções
use Dompdf\Dompdf;
use Dompdf\Options;

// Mudar o diretorio root
$options = new Options();
$options->setChroot(__DIR__);
$options->setIsRemoteEnabled(true);

// Cria uma instância do DOMPDF
$dompdf = new Dompdf($options);

// Carrega o conteúdo do arquivo template.php
ob_start();
require('template.php');
$html = ob_get_contents();
ob_get_clean();

// Configuração do cabeçalho em todas as páginas
$dompdf->getOptions()->setIsHtml5ParserEnabled(true);
$dompdf->getOptions()->setIsPhpEnabled(true);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4', 'portrait');

// Carrega o HTML no DOMPDF
$dompdf->loadHtml($html);

// Renderiza o PDF
$dompdf->render();

// Salva o PDF na pasta 'pdfs'
$fileName = "{$name} - {$daten}.pdf";
$filePath = "pdfs/" . $fileName;
file_put_contents($filePath, $dompdf->output());

/*header('Content-type: application/pdf');
echo $dompdf->output();*/

echo "PDF gerado e salvo com sucesso!";
?>

