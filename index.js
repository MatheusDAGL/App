const { select } = require('@inquirer/prompts')

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
                console.log("vamos cadastrar")
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
