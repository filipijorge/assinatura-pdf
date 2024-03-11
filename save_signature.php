<?php
// Verifica se foi recebida a assinatura
if (isset($_POST['signature'])) {
    // Obtém os dados da assinatura
    $signatureData = $_POST['signature'];

    // Remove o cabeçalho dos dados da imagem
    $base64Image = str_replace('data:image/png;base64,', '', $signatureData);

    // Decodifica os dados base64
    $signatureImage = base64_decode($base64Image);

    // Salva a assinatura como um arquivo PNG
    $fileName = 'assinatura.png';
    file_put_contents($fileName, $signatureImage);

    echo 'Assinatura salva com sucesso.';
} else {
    echo 'Erro: Nenhuma assinatura recebida.';
}
?>
