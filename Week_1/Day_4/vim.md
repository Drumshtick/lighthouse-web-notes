# Vim
Vim modes
Vim **operates in two modes** - ***edit and command mode.*** 

* **Edit** mode is the state in which the keys you type on are actually inserted into your document

* **Command** mode allows you to navigate through the document, search and replace text, copy and paste, etc. By default when you open a file, you're placed in command mode.

## Moving around
You can use the ```H```, ```K```, ```J``` and ```L``` keys to move around. Here's how it breaks down: ***"H" moves left***; ***"K" moves up***; ***"L" moves right***; ***"J" moves down***. You can, of course, **use the arrow keys as well**, although using arrow keys is apparently the non-ninja style of using vim.

## Tutorial
Let's create a small tutorial for creating and editing files in vim.

### Create/open a file
Create a new file and open it in vim by typing 

```vim tutorial.txt```.

**This will create a file named tutorial.txt and open it in vim.**

### Edit a file
***VIM launches into the command mode by default.***

***To switch to edit mode (also called "insert mode") you need to give VIM a command to tell it to switch modes. There are two ways to do this:***
* Press "i" to begin inserting text at the current cursor position.
* Press "a" to begin inserting after the current cursor position.
* Press "i" in the file to enter insert mode. Add some text to the file.

* ***Getting out of editing mode is a bit more intuitive: just hit the ESC key.***

**Press ESC in the file to make sure you are back to command mode.**

Got a handle on those three? Here are some other commands in command mode. And remember, *****these commands are case-sensitive*****, so take note of those stray capital letters:

* Y copies a line of text to the buffer.
* P pastes it to the cursor's current position.
* dd will delete the whole line of text. This will also effectively "cut" a line of text as well. When you delete a line, it's placed in the buffer.
* yy copies a whole line of text.

### Saving a file
While editing a file, its always a good idea to save the text. To do that you would need to do the following:

Make sure you are in command mode. Use escape key to make sure.
```
type :w
```
That's it.
Save the file while in command mode.

### Quit vim
Once you have finished editing you can quit vim in one of the following two ways:

* :wq - write (save) and quit file (and vim)
* :q! - quit and ignore changes made since last file save.

That is all you need to get started with vim.

## To learn more about vim - and there is quite a bit to it - vim comes with a walk through tutor, vimtutor, that you can run on your terminal.

Here is another quick cheatsheet for vim.

Although it may look more complex for a code editor when compared with VSCode, the vim senpais swear by the speed gains once you get used to it.

If you would like some Vim interactive tutorials, check out the links below (or bookmark them for later).

OpenVim - An interactive tutorial that teaches you the basics of Vim
Vim-Adventures - A gamified tutorial that teaches you Vim while you play a game!