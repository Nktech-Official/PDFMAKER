# PDFMAKER

It is a tool to generate Catolouge pdf for local market

### Pre Requisite

1. node.js version 16.x.x +
2. [ghostscript](https://ghostscript.com/releases/gsdnld.html) can be installed using apt on linux and brew on mac. windows users can download it from the link and add it to path. Required for copressed PDF (skip if compression not required)

> **Note**
> Note PDF generated is of large size use inbuild function to compress it which uses `ghostscript` below is the method to install ghostscript on different platforms

###### Mac

```zsh
brew install ghostscript
```

[see detailed instrustions](https://macappstore.org/ghostscript/)

###### Linux (Debian based)

```shell
sudo apt -y install ghostscript
```

[see detailed instrustions](https://installati.one/ubuntu/20.04/ghostscript/)

###### Windows 10 +

- Go to [ghostscript](https://ghostscript.com/releases/gsdnld.html) website and download the installer file for your system 32 or 64 bit
- Run the installer note the installing folder and copy it the default is:-

```ps
C:\Program Files\gs\gs<version-no>
```

- Paste the copied path in File Explorer Address bar.
- You have to add the bin and lib folder to path

```ps
C:\Program Files\gs\gs9.56.1\bin

C:\Program Files\gs\gs9.56.1\lib
```

> **Note**
> change the version number 9.56.1 with your version number

- search for environment you would see an option that says **Edit the System environment variables** click it
- Click the last option that say's Environtment Variables
- Under the User vairables click on Path and click edit
- Now click on new and paste the copied path
- Add the two copied path one by one
- After adding both paths click ok
- Open a New Terminal (powershell or command prompt) and run

```ps
gs --version
```

- This should print the version Number of GhostScript. if it does then your installation is successfull.

  > **Note**
  > if it does not work as expected try reopning the terminal after updating the Path variable . if still does not work restart your PC.

### Project-Setup

- clone the repo to your local system using git or Download Zip.

```shell
git clone https://github.com/Nktech-Official/PDFMAKER.git
```

- Open the projectFolder in terminal and run following command this will install required node pacakge.

```javascript
yarn install
```

- If you don't have yarn, use npm to install it.

```shell
npm install yarn --global
```

- To make changes to the template you need to first install node pacakges in pdfTemp folder using following command

```shell
cd pdfTemp
yarn install
```

- After changes to pdfTemp folder use the following command in root of the project to build the template files.

```shell
yarn buildtemplate
```

### Usage:-

> **Note**
> follow step 1 to 3 of [Project-Setup](#project-setup)

- create an .env file and add following variables

```.env
location="<location/to/output/pdf>"
#change only if port is changed
url="http://localhost:3000/"

#optional if data pass via flag's
imgDir="<location/to/imageDirectory/>"
xslxData = "<location/to/imageDirectory/>"
```

- Last two variables are optional if Data is provided by command line flag's
- Any one of two is required
- #### compressed file

  - If `imgDir & xslxData` are declared in .env

  ```shell
  yarn start --compress
  ```

  - If `imgDir & xslxData` are not declared in .env

  ```shell
  yarn start --compress --data-file "<location/to/imageDirectory/>" --img-dir "<location/to/imageDirectory/>"
  ```

- #### Shorthand

  | Flag          | ShortHand EquiValent | Usage                                            | meaning                 |
  | ------------- | -------------------- | ------------------------------------------------ | ----------------------- |
  | `--data-file` | `-Df`                | `yarn start -Df "<location/to/imageDirectory/>"` | set data file           |
  | `--img-dir`   | `-Id`                | `yarn start -Id "<location/to/imageDirectory/>"` | set Image Data folder   |
  | `--compress`  | `-C`                 | `yarn start -C`                                  | Generate compressed pdf |

> **Note**
> flag's can be used together to pass different data

> **Note**
> if `imgDir & xslxData` are not declared in `.env` file then both data must be provided using flags `--img-dir` and `--data-file` or there shortHand's respectively
