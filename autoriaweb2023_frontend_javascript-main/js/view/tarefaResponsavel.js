/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_tarefa">
              <div class="form-group">
                  <label for="tarefa_titulo" class="text-light">NOME:</label>
                  <input type="text" class="form-control" id="tarefa_titulo_formulario">
              </div>
              <div class="form-group">
                  <label for="tarefa_descricao" class="text-light">CPF:</label>
                  <textarea class="form-control" id="tarefa_descricao_formulario"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma tarefa existente.
 * @param {Object} tarefa - A tarefa a ser atualizada.
 * @return {string} HTML do formulário de atualização de tarefa.
 */
function renderizarFormularioAtualizar(tarefa) {
    return `
            <form class="mt-3" id="formulario_tarefa_atualizar">
                <input type="hidden" class="form-control" id="tarefa_id_formulario" value="${tarefa.id}">
                <div class="form-group">
                    <label for="tarefa_titulo" class="text-light">Título da tarefa:</label>
                    <input type="text" class="form-control" id="tarefa_titulo_formulario" value="${tarefa.nome}">
                </div>
                <div class="form-group">
                    <label for="tarefa_descricao" class="text-light">Descrição:</label>
                    <textarea class="form-control" id="tarefa_descricao_formulario">${tarefa.cpf}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} tarefas - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarTabela(tarefas) {
  let tabela = `
          <table class="table table-striped mt-3 table-dark">
              <thead>
                  <tr>
                      <th>NOME</th>
                      <th>CPF</th>
                  </tr>
              </thead>
              <tbody>
      `;

  tarefas.forEach((tarefa) => {
    tabela += `
              <tr>
                  <td>${tarefa.nome}</td>
                  <td>${tarefa.cpf}</td>
                  <td>
                    <button class="excluir-btn" tarefa-id=${tarefa.id}>Excluir</button>
                    <button class="atualizar-btn" tarefa-atualizar-id=${tarefa.id}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  tabela += `
              </tbody>
          </table>
          <button id="cadastrarResponsavel" class="btn btn-primary">Cadastrar</button>
      `;

  return tabela;
}

const tarefaResponsavel = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default tarefaResponsavel;
