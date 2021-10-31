# Packages
***What are packages?***

* Packages are **self-contained code libraries that we can install** and use in our projects.

If we want additional functionality in Node, then there is often a useful "***package" (short for "packaged library")*** available that has been written and maintained by other individuals or companies in the community.

***Wait, what are libraries, then?***
## Installing Packages
Installing and using packages in Node is relatively straightforward from the command line. **Say we want to install a package called chalk.**
```bash
npm install chalk
```
This **downloads chalk into the current directory/project** that we're in.

### package.json
Virtually all Node.js projects have a file called package.json, which looks similar to this:
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "Short project summary",
  "main": "index.js",
  "scripts": {
    "myscript": "ENV=development node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.13.4"
  }
}
```
There are some basic attributes such as the project's name, description, and author.

#### Custom Scripts In package.json
***The scripts portion*** allows us to run commands using an alias, for instance:
```
npm run myscript
```
### Dependencies In package.json
The dependencies section of package.json **lists the packages that need to be installed for the project to run properly.** In the above example it*** lists a package called express***, and the value ***^4.13.4 specifies the version.***

*****Review the full documentation of package.json https://docs.npmjs.com/files/package.json*****

## .gitignore (Always ignore logs and node_modules, Never ignore package.json and package-lock.json)
### Basics
* A .gitignore is a file in a git repository that specifies files for git not track.
* Each line of a .gitignore is a pattern.
* Blank lines are ignored.
* Lines beginning with a hash # are comments and are also ignored.
* Any files that match the pattern will not be tracked by git. This pattern can refer to a directory, a file, or a group of both.

The simplest way to ignore a file is to explicitly specify it by name. For example, **the line file.txt would ignore the file file.txt.**

#### Directories
In .gitignore files, forward-slash ```(/)``` ***is always used as the path separator.*** Directories can be ignored with or without a trailing path separator, but the two mean different things. **A line ending with a path separator will only match directories while a line without it will match files or directories.** For example, **bin/ will match all directories called bin.** *****bin will match all files or directories called bin.***** Ignoring a directory also ***ignores all files and subdirectories in that directory.***

#### Wildcards
.gitignore also allows ***wildcards and ranges.*** An **asterisk** ```*``` is the most common wildcard character. It matches zero or more characters that are not a slash. For example, the **following could be used to ignore all .json files and all .yml files that have -local. in the name:**
```
*.json
*-local.*
```
#### Range Notation
Range notation is a way to specify groups of characters allowable characters to match a single character. This notation is used by creating a list of characters contained in brackets []. For example [abcdefghi] would match any character a through i.

An easier way to specify ranges that are sequential is to use a -. [a-i] would match any character a through i and is identical to [abcdefghi] but shorter to type and easier to read.

Dashes can be used multiple times to specify multiple groupings. For example [a-zA-Z] is a common way to specify that a character can match any letter from a to z either capital or lowercase.

### Ignore Exceptions
Including a ! in front of the pattern will cause git to explicitly not ignore that file or directory. This can be useful to ignore all files and directories matching a pattern except for some specific ones. For example, in order to ignore all configuration files except for one that is a sample, you could do the following:
```shell
*.config
!/appname/settings.sample.config
```
This would ignore all .config files except for /appname/settings.sample.config. If you have multiple sample .config files in my repository, you do the following:
```
*.config
!*.sample.config
```
*****NOTE: It is not possible use a ! to cancel ignoring anything inside of an ignored directory. Once a directory is ignored, git will no longer transverse into that directory at all.*****


## NOTE
* **Module.** Is the smallest piece of software. A module is a set of methods or functions ready to be used somewhere else.
* **Package.** Is a collection of modules. This may sound funny, but usually what a package does, is gather a number of modules holding in general the same functional purpose. Making it easier to include all the related modules at once.
* **Library.** Well library at it's core, is a collections of packages. It's purpose is to offer a set of functionalities ready to use without worrying about the subsequent packages. So a library is what you include when you want to add some functionality to your code. It does not force any coding style on you either.
* **Framework.** It's a set of libraries. But this time, the framework does not just offer functionalities, but it also provides an architecture for the development work. In other words you don't include a framework. You integrate you code into it. He is the wire frame of the project. That's why a framework forces its coding style on you.

* ```npm install mocha chai --save-dev```
  * installs moha and chai as a DEVELOPMENT DEPENDANCY
  * devDependancies (under package.json) indicates that the dependancy is not required to run the project, rather it is for DEVELOPMENT PURPOSES ONLY