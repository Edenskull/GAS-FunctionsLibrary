# Add the library to your GAS project

1. At the left of the Apps Script editor, next to "Libraries," click Add a library add.
2. In the "Script ID" field, paste in the script ID of the library.
3. Click Look up.
4. Click the Version dropdown and select the version of the library to use (you can choose HEAD to switch to DevMode).
5. Check to see if the default "Identifier" name is the one that you want to use with this library. This is the name that your script uses to refer to the library. For example, if you set it to ``GASFLib`` then you can call a method of that library as follows: ``GASFLib.libraryMethod()``.

`⚠️ If you use an identifier name that matches the name of an already existing service, such as MailApp, or a previously added library, then the library you have added most recently overrides the existing service or library.`

6. Click Add.