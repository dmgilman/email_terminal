/*
 This file contains the logic for custom software programs
 that perform more complex actions than just displaying some text or HTML.

 You are invited to edit this file to define your own commands!
 Start by removing the demo ones that you don't need for your game.

 Remember that function names must match the names of the programs in software.json.
 */
/* eslint-disable no-inner-declarations, no-nested-ternary, no-sequences, no-unused-vars */

// function decrypt( args ) { // The same function can be used to encode text
//     if ( args.length === 0 ) {
//         return "<p>Some encrypted text must be provided: <code>decrypt 53CR3T T3XT</code></p>";
//     }
//     const textInClear = rot13( args.join( " " ) );
//     return `<p class="hack-reveal">${ textInClear }</p>`;
// }
// function rot13( s ) {
//     return s.replace( /[a-zA-Z]/g, ( c ) => String.fromCharCode( ( c <= "Z" ? 90 : 122 ) >= ( c = c.charCodeAt( 0 ) + 13 ) ? c : c - 26 ) );
// }
function cryptid( args){
    const aen = /a.*-re/
    const ade = /a.*-re/
    if( args.length === 0 && ! aen.test(args) && ! ade.test(args)){
        return "<p> Provide Encryption Mode: <code>AUTO-EN</code> <code>AUTO-DE</code>"
    }
    else if( aen.test(args)){
        const message = window.prompt("Plaintext Message: ");
        const keyPrimer = window.prompt("Key Phrase: ");
        const encryptedText = autokey(message,keyPrimer);
        return '<p class="hack-reveal">${encryptedText}</p>'
    }
    else if( ade.test(args)){
        const message = window.prompt("Encrypted Text: ");
        const keyPrimer = window.prompt("Key Phrase");
        const decryptedText =  autodekey(message,keyPrimer);
        return '<p class="hack-reveal">${decryptedText}</p>'
    }
    else{
        return '<p>Invalid Configuration.</p>'
    }
};
function emod(n, m){
    r = n % m;
    if( r<0){
        r = (m<0) ? r - m : r + m;
    };
    return r
};
function autokey(msg,key){
    let keystream = key+msg, out='';
    for(let i = 0; i < msg.length; i++){
        p = msg.charCodeAt(i);
        k = keystream.charCodeAt(i);
        c = (p + k - 64) % 95 + 32;
        out += String.fromCharCode(c);
    }
    return out;
};
function autodekey(msg,key){
    let keystream = key,out='';
    for(let i = 0; i < msg.length; i++){
        c = msg.charCodeAt(i);
        k = keystream.charCodeAt(i);
        p = emod(c-k,95);
        q = p + 32;
        out += String.fromCharCode(q);
        keystream += String.fromCharCode(p);
    }
    return out;
};

var test = cryptid('TRHET')