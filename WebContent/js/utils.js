var polishSpecChars = 'ĄĆĘŁŃÓŚŻŹ'

function charToSpec(ch) {
    for(var i=0; i < polishSpecChars.length; i++ ) 
    {
        if (ch == polishSpecChars.charAt(i)) {
            return "#"+i
        }
    }
    return ch
}

function codePolishWordToWordWithSpecs(word) {
    var result = ""
    for(var i=0; i < word.length; i++ ) {
        result += charToSpec(word.charAt(i))
    }
    return result
}


function decodeWordWithSpecsToPolishWord(word) {    
    for(var i=0; i < polishSpecChars.length; i++ ) 
    {
        word = word.replace("#"+i, polishSpecChars.charAt(i))        
    }
    return word
}
