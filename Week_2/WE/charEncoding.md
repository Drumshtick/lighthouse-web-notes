# Character Encoding
**Character Set** - Characters that are needed for a specific purpose are grouped into a character set. (AKA a *repertoire*)
  * **Code Point** - Each character in a Char Set is associated with a number called a code point
  * Each character is stored as one or more bytes
  * **Character Encoding** - Provides a key to convert the sequence of code points to convert it to a readable string, without the appropriate 'key' the data would be unreadable

**Font** - A collection of 'glyph' definitions.
  * After the computer has computed which characters it is working with it will look in the font for the corresponding glyphs.
  * If a glyph cannot be found to match with the correct character the square box of doom will show

**UTF-8** - 99.99% of the time this is the correct character encoding format
  * NOTE - just declaring a different encoding in your page won't change the bytes; *you need to save the text in that encoding too.*
  * UTF-8 is usually the default for text editors/IDEs these days
  * Servers should be checked to ensure they are serving documents with the correct HTTP declaration (UTF-8)
  * To use characters with code points above the range of a single byte in UTF-8 a second byte is required.
  * Some Unicode chars map to one, three or four bytes in UTF-8 Encoding
  * ONLY ASCII characters are encoded with a single byte in UTF-8
  * UTF-8 should always be used with web pages AND databases
  * The Devanagari character क, with code point 2325 (HEX 915) will be represented by:
    * 2 bytes in UTF-16 (HEX 09 15)
    * 3 bytes in UTF-8 (HEX Eo A4 95)
    * 4 bytes in UTF-32 (HEX 00 00 09 15)

# HISTORY
* Encoding began with the teletype post WWII 
* Nothing was standardized after the development of computer encoding
  * Japan had 4 different encoding formats itself! Europe had numerous formats
  *  Mojibake - Japanese word for garbled characters
  * Sending data from computer to computer was NEVER done, printing then faxing the document was the method of transfer pre-WWW
* After the advent of the internet these different formats were a real problem, computers from around the world could not communicate at all unless they shared these very region specific formats
* To solve this incompatible format issue that the internet created the Unicode Consortium
  * They created a standard 
  * List of 100 000 characters in 100 000 numbers
  * Tons of languages supperted
  * They invented UTF-8
  * The problem with having 100 000 chars associated with numbers is the bulk of numbers needed to represent a single character
  * English 'A' would have about 8 0's before each letter (which happens to be read as a NULL or end of character by old computers meaning the charater wouldnt be read!) This also created MASSIVE file sizes for a short document! Very wasteful
* UTF-8 is great because:
  * It's backwards compatible to VERY old systems (Avoids the 8 0's which is a null)
  * Avoids waste
  * Uses headers to store large numbers across many bytes

# Important MUST-KNOW's about UNICODE and Character sets

Plain text = ascii = 8 bits <-------------| WRONG
* ASCII used code points 37 - 128 for 'printable character' BUT ONLY ENGLISH
  * 37 < was reserved for 'unprintable characters' i.e 7 made your computer beep and 12 would eject paper from the printer and load another
  * code points 128 - 255 (255 was the max for 7 bit integers) was a FREE FOR ALL
    * Some companies used custom shapes (IBM used it to hold lines and crosses so you could draw boxes) 
    * Eventually different systems were used in this space for language support, called CODE PAGES. Greek was 737, Israel was 862
* In asia (with thousands of characters in the alphabet) a system called Double Byte Character Sets were used (DBCS) Some bytes were given one byte and others two.
## Unicode
* Includes every reasonable writing system in a single character set (Including Klingon!)
* Most believe with 16-bit codes there was 65,536 possible chars, THIS IS INCORRECT, There is far more than that
* Every unique letter in Unicode has an associated **code point** like:
>U+0639 -- U+ means 'Unicode'
### Unicode Encodings
* At the beginning of every Unicode string is a **Unicode Byte Order Mark** Either FE FF or FF FE depending on the endian style of the CPU, Without this the program wouldnt know what order the bytes should be interpreted in. (NOT EVERY UNICODE STRING HAS THIS THOUGH)
* In English speaking countries Unicode code points often had and extra 00 in memory. Most english code points were like this **U+00FF**
  * In walks UTF-8, This solved the extra byte issue as it stored code points 0 - 127 in a single byte. Only code points above 128 are stored using 2, 3... up to 6 bytes. 
```
Hello --> U+0048 U+0065 U+006C U+006C U+006F --> 48 65 6C 6C 6F
^^^English   ^^^^Unicode code points^^^^^         UTF-8^^^^
```
  * Thus saving AMERICANS extra space
* Storing unicode in 2 bytes is called UCS-2 or UTF-16 (Endian type must be known)
* UTF-8 is single byte (Endian doesnt matter)
* UTF-7 uses 7 bits, guaranteeing  the high bit will always be 0
* UCS-4 Stores each code point in  4 bytes (MEMORY INTENSIVE)
* UTF-7 8 16 and 32 can store any code point correctly, UTF-8 will store MOST correctly, rendering a box when there is no equivelant code in UNICODE (FOR older encodings)

# NOTE
* THERE IS NO SUCH THING AS PLAIN TEXT, plain text doesn't equal ASCII
* Every time there is a string MAKE SURE YOU KNOW THE ENCODING TYPE
* A string could be in UTF-8, ASCII, ISO 8859-1 (Latin1) or Windows 1252 (Western European) if you don't know you should figure it out
* This data can be found under the content-type header
> Content-Type: text/plain; charset="UTF-8"
* Web Pages have the encoding type INSIDE the document. So how to read it if you dont know how to encode the text?
  * Almost every encoding format has the same characters between 32 and 127 so you can ALWAYS read the first few lines of an HTML page's header
```html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```
  * the ```<meta>``` tag needs to be the first tag it sees (almost anyway) because the WHOLE PAGE will be reinterpreted and rendered after the browser gets to the content-type header
  * If a browser doesn't see this tag...
    * IE will guess based on the frequency in which various bytes appear in typical text in typical encodings of various langs

* UTF-8 is a variable length encoding type: meaning codes of varying lengths are used to encode a character set (repertoire)
  * UTF-8 can use 1 - 4 bytes, typically 2