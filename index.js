const { select,input} = require('@inquirer/prompts')

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

async function Menu  ()  {

    while (true){
        const opcao = await select({
            message: "Menu >",
            choices:[
                {
                name: "Cadastrar Meta",
                value: "cadastrar"
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
