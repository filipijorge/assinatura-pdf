// Configuração do Signature Pad
var canvas = document.getElementById('signatureCanvas');
var signaturePad = new SignaturePad(canvas);

function saveSignature() {
    var username = document.getElementById('username').value;

    // Verifica se o nome foi preenchido
    if (!username.trim()) {
        alert('Por favor, insira seu nome.');
        return;
    }

    // Verifica se a caixa de seleção foi marcada
    if (!document.getElementById('gridCheck').checked) {
        alert('Por favor, concorde com os termos.');
        return;
    }

    // Verifica se foi assinado
    if (!signaturePad.isEmpty()) {
        // Salva a assinatura como arquivo PNG
        var dataURL = signaturePad.toDataURL('image/png');
        var formData = new FormData();
        formData.append('signature', dataURL);

        // Envia a assinatura para save_signature.php
        fetch('save_signature.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Assinatura salva com sucesso.');

                // Obtém o nome do usuário do campo de entrada
                //var username = document.getElementById('username').value;

                // Chama generate_pdf.php para criar o PDF
                fetch('generate_pdf.php', {
                    method: 'POST',
                    body: JSON.stringify({ username: username }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // Limpa o formulário
                        clearForm();

                        alert('Documento assinado com sucesso!');
                        // Aqui você pode redirecionar o usuário ou realizar outra ação após a geração do PDF
                      
                    } else {
                        console.error('Erro ao gerar o PDF.');
                    }
                })
                .catch(error => console.error('Erro ao chamar generate_pdf.php:', error));
            } else {
                console.error('Erro ao salvar a assinatura.');
            }
        })
        .catch(error => console.error('Erro ao enviar a assinatura para save_signature.php:', error));
    } else {
        alert('Por favor, assine o documento.');
    }
}

function clearSignature() {
    signaturePad.clear(); // Limpa a assinatura no canvas
}

function clearForm() {
    // Limpa o nome
    document.getElementById('username').value = '';

    // Desmarca a caixa de seleção
    document.getElementById('gridCheck').checked = false;

    // Limpa a assinatura no canvas
    signaturePad.clear();
}
