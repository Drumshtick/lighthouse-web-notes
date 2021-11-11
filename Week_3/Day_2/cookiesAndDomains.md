# Cookie Accessibility
>Who, or which website(s), have access to a cookie?

**The short answer:** A browser cookie is specific to the domain that created it. *Only the web pages within the domain that created the cookie are able to access its contents.*

* The browser sends cookie data with subsequent requests to the server, so only cookies that pertain to the website in question are included in the request headers.

* When it comes to reading/writing potentially sensitive personal information, security and privacy immediately jump to mind. While cookies can specify where they're accessible to (domain=), they cannot be set across different domains. The same is true when attempting to read cookies. Website a.com cannot read cookies that are set by website b.com.

* Things get more complicated with subdomains. Depending on the the domain= property, a server on example.com could allow subdomain.example.com to access its cookies, or not (and vice versa). These details are not crucial at this point, but if you are interested in digging deeper, read the following:

There is a distinction between the Domain attribute value and the effective domain: the former is taken from the Set-Cookie header field and the latter is the interpretation of that attribute value. According to the RFC 2965, the following should apply:
1. If the Set-Cookie header field does not have a Domain attribute, the effective domain is the domain of the request.
2. If there is a Domain attribute present, its value will be used as effective domain (if the value does not start with a . it will be added by the client).

Having the effective domain it must also domain-match the current requested domain for being set; otherwise the cookie will be revised. The same rule applies for choosing the cookies to be sent in a request.

Mapping this knowledge onto your questions, the following should apply:

* Cookie with Domain=.example.com will be available for www.example.com
* Cookie with Domain=.example.com will be available for example.com
* Cookie with Domain=example.com will be converted to .example.com and thus will also be available for www.example.com
* Cookie with Domain=example.com will not be available for anotherexample.com
* www.example.com will be able to set cookie for example.com
* www.example.com will not be able to set cookie for www2.example.com
* www.example.com will not be able to set cookie for .com

And to set and read a cookie for/by www.example.com and example.com, set it for .www.example.com and .example.com respectively. But the first (.www.example.com) will only be accessible for other domains below that domain (e.g. foo.www.example.com or bar.www.example.com) where .example.com can also be accessed by any other domain below example.com (e.g. foo.example.com or bar.example.com).