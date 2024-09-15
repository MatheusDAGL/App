const { select,input,checkbox} = require('@inquirer/prompts')

let mensagem = "Bem vindo ao app de metas!"

let meta = {
    value: "Tomar 2L de água por dia",
    checked: false,


}

let metas = [meta]

const CadastrarMeta = async () => {
    const meta = await input ({ message: "Digite a meta: "})

    if(meta.length == 0) {
        mensagem = "A meta não pode estar vazia."
        return
    }
    
    metas.push({value: meta,checked:false})

    mensagem = "Meta cadastrada com sucesso!"
}

const ListarMeta = async () => {

    if (metas.length == 0){
        mensagem = "Nenhuma meta selecionada."
           return 
   }
   
    const resposta = await checkbox({
        message:"Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
        choices: [...metas],
        instructions:false
    })

    metas.forEach((m) =>{
        m.checked = false
    }
)
    if (resposta.length == 0){
     mensagem = "Nenhuma meta selecionada."
        return 
}

    resposta.forEach((resposta) => {
        const meta = metas.find((m) =>{
            return m.value == resposta
        })

        meta.checked = true 
    })

    mensagem = ("Meta(s) marcada(s) concluída(s)")
}

const MetasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0 ){
        mensagem = "Não existem metas realizadas!"
        return
}

    await select({
        message: "Metas Realizadas: "+realizadas.length,
        choices: [...realizadas]
    })
}

const MetasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })
    if (abertas.length == 0){
        mensagem = "Não existem metas abertas!Você é demais!!!"
        return
    }

    await select ({
        message: "Metas Abertas: "+abertas.length,
        choices: [...abertas]
    })
}

const DeletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) =>{
        return {value: meta.value,checked:false }
    })
    const itensAdeletar = await checkbox({
        message:"Selecione um item para deletar.",
        choices: [...metasDesmarcadas],
        instructions:false
    })

    if (itensAdeletar.length == 0 ){
       mensagem = "Nenhum item para deletar selecionado."
       return
    }

    itensAdeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"

}

const MostrarMensagem = () => {
    console.clear();

    if (mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

 const Menu = async () => {

    while (true){
        MostrarMensagem()
        const opcao = await select({
            message: "Menu >",
            choices:[
                {
                name: "Cadastrar meta",
                value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"                 

                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"                 

                },
                {
                    name: "Metas Abertas",
                    value: "abertas"                 

                },
                {
                    name: "Deletar meta",
                    value: "deletar"
                },
                {
                    name:"Sair",
                    value:"sair"
                }
            ]
        })
        switch (opcao)
        {
            case "cadastrar":
                await CadastrarMeta()
                break

            case "listar":
                await ListarMeta()
                break

            case "realizadas":
                await MetasRealizadas()
                break

            case "abertas":
                await MetasAbertas()
                break

            case "deletar":
                await DeletarMetas()
                break

            case "sair":
                console.log("Você saiu.Até logo!")
                return

        }

    }
    
}
Menu()
