# Windows Setup

## Instalando o NodeJS

Para estar rodando o projeto no Windows é necessário instalar o NodeJS v20.15.1 LTS.

1. Execute o Windows Powershell como administrador

Aperte a tecla Windows (super) e digite Powershell, do lado direito aparecerá a opção `Executar como Administrador`

2. Instale o FNM (Fast Node Manager)

Para gerenciar a versão do NodeJS no Windows, será usado o FNM. Para instalar, execute o comando abaixo:

```shell
winget install Schniz.fnm
```

Feche o Powershell e o abra novamente (como administrador)

3. Configurar o FNM no Shell

Para terminar de configurar o FNM no shell, é preciso adicionar no arquivo de perfil do Powershell um comando.
Primeiro, é necessário garantir que o arquivo de perfil do powershell existe. Rode o comando abaixo:

```shell
if (-not (Test-Path $PROFILE)) { $null = New-Item -Force $PROFILE }
```

Agora, insira a inicialização do FNM no arquivo de perfil:

```shell
echo "fnm env --use-on-cd | Out-String | Invoke-Expression" >> $PROFILE
```

Novamente, feche o Powershell e o abra novamente (como administrador)

4. Instale o NodeJS

Para instalar o NodeJS usando o FNM, execute o comando:

```shell
fnm use --install-if-missing 20
```

Para confirmar que tudo deu certo, rode o comando:

```shell
node -v
```

Você deverá ver a mensagem `v20.15.1`

## Instalando o Android Studio

1. Acesse o [site oficial](https://developer.android.com/studio) para baixar o Android Studio. Desça a página até a seção `Downloads do Android Studio` e clique na opção para Windows com final `.exe`.

2. Ao finalizar o download, execute o arquivo. Siga as instruções até o final sem alterar qualquer configuração que aparecer.

3. Ao finalizar a instalação, crie um novo smartphone clicando em **More Actions > Virtual Device Manager > + > Medium Phone > Next > API 35 > Next > Finish**

4. Selecione o Medium Phone e clique no símbolo de ▶️ play para iniciar a emulação do Android.

> Obs.: Nas próximas vezes, basta clicar em **More Actions > Virtual Device Manager** e dar ▶️ play no Medium Phone.

## Realizando a Build do Aplicativo

Dentro da pasta do projeto, instale os pacotes utilizados com o comando abaixo:

```bash
npm install
```

Agora instale o pacote `expo-build-properties`

```bash
npx expo install expo-build-properties
```

Agora, inicie a build do aplicativo com o comando abaixo:

```bash
npx expo run android
```

E, **deu erro**. Isso é esperado. A intenção de rodar esse comando agora é pra gerar a pasta `/android`, mas é necessário colocar como configuração o _path_ (local de instalação) do SDK.


Dentro da pasta android, crie o arquivo `local.properties` e dentro dele coloque o seguinte conteúdo:

```bash
sdk.dir=C:\\Users\\{NOME DO SEU USUARIO WINDOWS}\\AppData\\Local\\Android\\sdk
```

Substitua `{NOME DO SEU USUARIO WINDOWS}` pelo nome so seu usuário Windows. Para conferir qual seu usuário Windows, rode o comando:

```bash
$Env:UserName
```

Agora, rode novamente o comando de build:

```bash
npx expo run android
```

Com isso, o aplicativo deverá ser aberto dentro da emulação do Android Studio.

---

**Fim :)**
