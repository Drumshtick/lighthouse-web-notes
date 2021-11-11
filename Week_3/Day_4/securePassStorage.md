# Storing Passwords Securely
> <center>⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️Never Store Passwords inPlainText!!! ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️</center>
## Why is storing a plain-text password bad?
* Users use the same password for most of the services they use
* so I’ll encrypt the passwords (using something like RSA or Blowfish). This way passwords are not in the database and they are still retrievable.
  * WRONG
  *  If you can decrypt your passwords, so can the hacker that gets control of your servers and database. Again, this information is not yours to retrieve.
* things I should know about the flow of passwords on my site:
  * **Use SSL**. Spend some money (or don’t, by using services like Let’s Encrypt) on a certificate and place anything that has to do with user details under HTTPS. All traffic having to do with sensitive information must be passed through a connection secured by a valid SSL certificate. You know what, just have your entire site use HTTPS instead of HTTP. It’s no longer the overhead it once was and it will save you a big headache developing your product.
  * Don’t put any limitations on the passwords people can use (maximum lengths, disallowing certain characters, etc.) or on how they can use them, like disabling pasting into the password field from a password manager. You should put a ‘sanity’ check on password length, like 1024 characters, so that you don’t get DDOS’d due to long hash calculations, but that’s pretty much it.
  * There are a slew of other great pieces of advice all around the web, like not using security questions or implementing Two-Factor Authentication, but we do not claim to have written the Definitive Guide to Password Security, so go out and learn how to protect your clients’ data. If you have found useful resources, please leave a comment here with the link to share with others.
## Defense in Depth
* The theory is that you harden every layer you can rather than hardening just one layer and hoping it's enough.
## Safely Storing Passwords
<center>Passwords shouldn't be encrypted, they should be hashed!</center>

### Encryption vs. Hashing
* Encryption is a reversible process:
  * all of the listed (DES, RSA, Blowfish, AES) algorithms use a secret key (some string that you provide) to convert the inputs to an encrypted output, but they can also reverse the process.
  * If you encrypt your passwords, then the secret key will be on your server, and if you server is compromised, then the passwords can be decrypted very easily (so, it's pretty much as useless as not encrypting at all).
* Hashing is a one-way process.
  * A password can be converted to some unintelligible string (called the "digest"), but the *****process can never be reversed.*****
* *****To check if a user's log-in password matches the password that's been hashed, we just hash the login-password and check it against the stored hash.*****

### Strong Cryptographic Hashing
* which hashing algorithm should we use?
  * MD5 or SHA1?
  * Those are indeed hash algorithms, but are trivial to break.
  * Password hash functions need to be designed so that they can't be brute-forced on fast CPUs, fast GPUs, or computers with a lot of RAM, and must be resistant to rainbow table attacks. (See, crypto is hard!)
> The current LHL recommendation (as of 2021-06-06) is to use bcryptjs.
* But, who knows, in 2 years from now, someone might break bcryptjs. As a developer of applications that store sensitive information, it is your responsibility to stay up to date.

## Theory of Securely hashing passwords
* We need to hash passwords as a second line of defence.
* Tools
  * ***Cryptographic hash functions:*** these are fascinating mathematical objects which everybody can compute efficiently, and yet **nobody knows how to invert them.** This looks good for our problem - the server could store a hash of a password; when presented with a putative password, the server just has to hash it to see if it gets the same value; and yet, knowing the hash does not reveal the password itself.
  * ***Salts***: *among the advantages of the attacker over the defender is parallelism.*
    * *The attacker usually grabs a whole list of hashed passwords,* and is interested in breaking as many of them as possible. **He may try to attack several in parallel.** For instance, the attacker may consider one potential password, hash it, and then compare the value with 100 hashed passwords; this means that the attacker shares the cost of hashing over several attacked passwords. A similar optimisation is precomputed tables, including rainbow tables; this is still parallelism, with a space-time change of coordinates.
  **The common characteristic of all attacks which use parallelism is that they work over several passwords which were processed with the exact same hash function.** Salting is about using not one hash function, but a lot of distinct hash functions; ideally,*** each instance of password hashing should use its own hash function.*** A salt is a way to select a specific hash function among a big family of hash functions. ***Properly applied salts will completely thwart parallel attacks (including rainbow tables).***
  *  ***Slowness***: computers become faster over time (Gordon Moore, co-founder of Intel, theorized it in his famous law). Human brains do not. This means that attackers can "try" more and more potential passwords as years pass, while users cannot remember more and more complex passwords (or flatly refuse to). To counter that trend, we can make hashing inherently slow by defining the hash function to use a lot of internal iterations (thousands, possibly millions).