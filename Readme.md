## playing with routes
    - /ab?c == here b is optional, /abc is valid as well as /ac is also valid
    - /ab+c == here b can be repeated any number of times. /abc is valid as well as /abbbbbbbbbbbbbbbbc is also valid. keep in mind that route should end with c only.
    - /a(bc)d == Here bc is optional, /abcd is valid and /ad is also valid
    - /ab*c == Here after we can write anything but it should end with c only.
        - Example = /abcdefghijc(it is valid)
## We can also use regular expression for routing
        -for /a/ = if anywhere in the passed route "a" comes it will be a valid route 
        -for /.*fly$ = anything which end with the word fly it will ba a valid route