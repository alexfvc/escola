/*// Função para alternar seleção de todos os bimestres
function toggleAllBimesters() {
    const allBimestersCheckbox = document.getElementById('allBimesters');
    const bimestersCheckboxes = document.querySelectorAll('.bimester-filter input[type="checkbox"]:not(#allBimesters)');
    
    bimestersCheckboxes.forEach(checkbox => {
        checkbox.checked = allBimestersCheckbox.checked;
    });
}

function filterDates() {
    const fileInput = document.getElementById('csvFile');
    const resultTable = document.getElementById('resultTable');
    const headerRow = document.getElementById('headerRow');
    const resultBody = document.getElementById('resultBody');
    const dayCheckboxes = document.querySelectorAll('.days-filter input[type="checkbox"]:checked');
    const bimesterCheckboxes = document.querySelectorAll('.bimester-filter input[type="checkbox"]:not(#allBimesters):checked');
    
    if (fileInput.files.length === 0) {
        alert("Por favor, escolha um arquivo CSV.");
        return;
    }
    
    if (dayCheckboxes.length === 0) {
        alert("Por favor, selecione pelo menos um dia da semana.");
        return;
    }
    
    if (bimesterCheckboxes.length === 0) {
        alert("Por favor, selecione pelo menos um bimestre.");
        return;
    }
    
    // Obter dias e bimestres selecionados
    const selectedDays = Array.from(dayCheckboxes).map(cb => cb.value);
    const selectedBimesters = Array.from(bimesterCheckboxes).map(cb => cb.value);

    const file = fileInput.files[0];
    
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        delimiter: ",",
        complete: function(results) {
            const data = results.data;
            const bimesters = {};
            
            // Agrupar datas por bimestre
            data.forEach(row => {
                const day = row['dia letivo'];
                const date = row['data'];
                const bimester = row['bimestre'];

                // Verifica se o dia letivo e o bimestre estão selecionados
                if (selectedDays.includes(day) && selectedBimesters.includes(bimester)) {
                    if (!bimesters[bimester]) {
                        bimesters[bimester] = [];
                    }
                    bimesters[bimester].push(date);
                }
            });

            // Limpar a tabela de resultados
            headerRow.innerHTML = '';
            resultBody.innerHTML = '';

            // Criar cabeçalho da tabela dinamicamente
            selectedBimesters.forEach(bimester => {
                const th = document.createElement('th');
                th.innerText = bimester;
                headerRow.appendChild(th);
            });

            // Preencher a tabela com as datas filtradas
            const maxDates = Math.max(...Object.values(bimesters).map(b => b.length));
            
            for (let i = 0; i < maxDates; i++) {
                const tr = document.createElement('tr');
                selectedBimesters.forEach(bimester => {
                    const td = document.createElement('td');
                    td.innerText = bimesters[bimester][i] || '';
                    tr.appendChild(td);
                });
                resultBody.appendChild(tr);
            }
        }
    });
}
*/

// PATH = C:\Users\alexf\OneDrive\Documentos\programacao\estudos des web\teste py html\planejamento - Copia.csv

// Caminho fixo para o arquivo CSV

const csvFilePath = 'planejamento - Copia.csv'; // Substitua pelo caminho correto

// Função para alternar seleção de todos os bimestres
function toggleAllBimesters() {
    const allBimestersCheckbox = document.getElementById('allBimesters');
    const bimestersCheckboxes = document.querySelectorAll('.bimester-filter input[type="checkbox"]:not(#allBimesters)');
    
    bimestersCheckboxes.forEach(checkbox => {
        checkbox.checked = allBimestersCheckbox.checked;
    });
}

function filterDates() {
    const resultTable = document.getElementById('resultTable');
    const headerRow = document.getElementById('headerRow');
    const resultBody = document.getElementById('resultBody');
    const dayCheckboxes = document.querySelectorAll('.days-filter input[type="checkbox"]:checked');
    const bimesterCheckboxes = document.querySelectorAll('.bimester-filter input[type="checkbox"]:not(#allBimesters):checked');
    
    if (dayCheckboxes.length === 0) {
        alert("Por favor, selecione pelo menos um dia da semana.");
        return;
    }
    
    if (bimesterCheckboxes.length === 0) {
        alert("Por favor, selecione pelo menos um bimestre.");
        return;
    }
    
    // Obter dias e bimestres selecionados
    const selectedDays = Array.from(dayCheckboxes).map(cb => cb.value);
    const selectedBimesters = Array.from(bimesterCheckboxes).map(cb => cb.value);

    // Carregar o arquivo CSV
    Papa.parse(csvFilePath, {
        header: true,
        skipEmptyLines: true,
        delimiter: ",",
        download: true,
        complete: function(results) {
            const data = results.data;
            const bimesters = {};
            
            // Agrupar datas por bimestre
            data.forEach(row => {
                const day = row['dia letivo'];
                const date = row['data'];
                const bimester = row['bimestre'];

                // Verifica se o dia letivo e o bimestre estão selecionados
                if (selectedDays.includes(day) && selectedBimesters.includes(bimester)) {
                    if (!bimesters[bimester]) {
                        bimesters[bimester] = [];
                    }
                    bimesters[bimester].push(date);
                }
            });

            // Limpar a tabela de resultados
            headerRow.innerHTML = '';
            resultBody.innerHTML = '';

            // Criar cabeçalho da tabela dinamicamente
            selectedBimesters.forEach(bimester => {
                const th = document.createElement('th');
                th.innerText = bimester;
                headerRow.appendChild(th);
            });

            // Preencher a tabela com as datas filtradas
            const maxDates = Math.max(...Object.values(bimesters).map(b => b.length));
            
            for (let i = 0; i < maxDates; i++) {
                const tr = document.createElement('tr');
                selectedBimesters.forEach(bimester => {
                    const td = document.createElement('td');
                    td.innerText = bimesters[bimester][i] || '';
                    tr.appendChild(td);
                });
                resultBody.appendChild(tr);
            }
        }
    });
}

// Carregar e filtrar os dados ao carregar a página
window.onload = filterDates;
