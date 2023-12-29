import tarefaView from "../view/tarefaResponsavel.js";
import { API_BASE_URL } from "../config/config.js";

const $ = document.querySelector.bind(document);

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarTarefaFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = tarefaView.renderizarFormulario();
  document.getElementById("formulario_tarefa").addEventListener("submit", cadastrarTarefa);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarTarefa(event) {
  event.preventDefault();
  const tituloValor = document.getElementById("tarefa_titulo_formulario").value;
  const descricaoValor = document.getElementById("tarefa_descricao_formulario").value;
  const novaTarefa = { nome: tituloValor, cpf: descricaoValor };

  try {
    await fetch(`${API_BASE_URL}/responsavel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTarefa),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaresponsavel(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
}
/**
 * Renderiza a lista de responsavel.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaresponsavel(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/responsavel");
    const responsavelBD = await response.json(); 

    const responsavel = responsavelBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        cpf: row.cpf
      };
    });
    componentePrincipal.innerHTML = tarefaView.renderizarTabela(responsavel);
    $("#cadastrarResponsavel").addEventListener("click", function() {
      renderizarTarefaFormulario(componentePrincipal);
    });
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar responsavel:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de tarefa.
 * Cada botão, quando clicado, aciona a função de exclusão de tarefa correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const tarefaId = this.getAttribute("tarefa-id");
      excluirTarefa(tarefaId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de tarefa.
 * Cada botão, quando clicado, aciona a função de buscar a tarefa específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const tarefaId = this.getAttribute("tarefa-atualizar-id");
      buscarTarefa(tarefaId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de responsavel é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirTarefa(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/responsavel/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a tarefa");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaresponsavel(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarTarefa(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/responsavel/${id}`);
    const responsavelBD = await response.json();
    if (responsavelBD.length <= 0) return;

    const tarefa = responsavelBD.map(row => ({
      id: row.id,
      nome: row.nome,
      cpf: row.cpf,
      dataAbertura: row.data_abertura,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = tarefaView.renderizarFormularioAtualizar(tarefa);
    document.getElementById("formulario_tarefa_atualizar").addEventListener("submit", atualizarTarefa);
  } catch (error) {
    console.error("Erro ao buscar responsavel:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarTarefa(event) {
  event.preventDefault();

  const idValor = document.getElementById("tarefa_id_formulario").value;
  const tituloValor = document.getElementById("tarefa_titulo_formulario").value;
  const descricaoValor = document.getElementById("tarefa_descricao_formulario").value;
  const tarefa = {id: idValor, nome: tituloValor,cpf: descricaoValor,};

  try {
    const response = await fetch(`${API_BASE_URL}/responsavel`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(tarefa),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a tarefa");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaresponsavel(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
  }
}

const ResponsavelController = {
  renderizarTarefaFormulario,
  cadastrarTarefa,
  renderizarListaresponsavel,
  excluirTarefa,
};

export default ResponsavelController;
