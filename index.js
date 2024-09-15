const { select,input,checkbox} = require('@inquirer/prompts')

let meta = {
    value: "Tomar 2L de água por dia",
    checked: false,

}

let metas = [meta]

const CadastrarMeta = async () => {
    const meta = await input ({ message: "Digite a meta: "})

    if(meta.length == 0) {
        console.log("A meta não pode estar vazia.")
        return
    }
    
    metas.push({value: meta,checked:false})
}

const ListarMeta = async () => {
    const resposta = await checkbox({
        message:"Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
        choices: [...metas],
        instructions:false
    })

    metas.forEach((m) =>{
        m.checked = false
    }
)

    if (resposta.lenght == 0){
        console.log("Nenhuma meta selecionada.")
        return 
    }



    resposta.forEach((resposta) => {
        const meta = metas.find((m) =>{
            return m.value == resposta
        })

        meta.checked = true 
    })

    console.log("Meta(s) marcada(s) concluída(s)")
}

const MetasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0 ){
        console.log("Não existem metas realizadas!")
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
    if (abertas.lenght == 0){
        console.log("Não existem metas abertas!Você é demais!!!")
        return
    }

    await select ({
        message: "Metas Abertas: "+abertas.length,
        choices: [...abertas]
    })
}

 const Menu = async () => {

    while (true){
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
                console.log(metas)
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
                console.log("Vamos deletar")
                break

            case "sair":
                console.log("Saiu.Acabou tudo.")
                return

        }

    }
    
}
Menu()
