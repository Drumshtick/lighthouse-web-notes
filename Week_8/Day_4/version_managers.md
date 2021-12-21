# Versions Managers

Version Managers are useful tools that allow us to easily download and switch between different versions of software, like Node.

## Why Not Use the Latest?

Node is a Javascript Runtime. This means it can be used to execute Javascript. How it does that can change in small ways version to version.

Runtime: **Software/instructions that are executed while your program is running. Especially instructions that were not written EXPLICITLY** but are necessary for the correct execution of your code. C (and other low level langs) have a very small if any runtime.

When a developer begins a project with Node, **they may wish to use a specific version of Node for that project**. Perhaps **certain packages rely on that version** of Node. Perhaps the developer **started the project in one version of Node**, ***and newer versions introduced features that could break their project***.

What if another project comes along that can, and perhaps should, use the latest version of Node? **Updating Node on their machine could break older projects.**

This is where Version Managers, like NVM, come in.

## What is NVM?
NVM is the Node Version Manager. It allows a developer to use their command line to easily download and switch between different versions of node on their machine.

For example, you can install a specific version of node
```sh
nvm install 8.0.0
```
Then set that version to be the one used when the node command is used.
```sh
nvm use 8.0.0
```
If you wanted to see what versions you have installed you can use the following:
```sh
nvm ls
```
or
```sh
nvm list
```

## What Other Version Managers Are There?
In the weeks to come you'll be learning how to use Ruby, which has it's very own version manager called [RVM](https://rvm.io/).

However, like most tools in the programming (and especially web development) space, every mainstream tool has an alternative.

Tools like [n](https://github.com/tj/n), [asdf](https://github.com/asdf-vm/asdf), and [rbenv](https://github.com/rbenv/rbenv).

RVM is the Version manager currently installed on your vagrant VM, and is the one we will be introducing to you in this course. However, feel free to read up on other Version Managers. Every workplace has it's quirks, and some basic Version Manager knowledge could set you apart from the rest!