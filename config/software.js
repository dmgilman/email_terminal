/*
 This file contains the logic for custom software programs
 that perform more complex actions than just displaying some text or HTML.

 You are invited to edit this file to define your own commands!
 Start by removing the demo ones that you don't need for your game.

 Remember that function names must match the names of the programs in software.json.
 */
/* eslint-disable no-inner-declarations, no-nested-ternary, no-sequences, no-unused-vars */

function decrypt( args ) { // The same function can be used to encode text
    if ( args.length === 0 ) {
        return "<p>Some encrypted text must be provided: <code>decrypt 53CR3T T3XT</code></p>";
    }
    const textInClear = rot13( args.join( " " ) );
    return `<p class="hack-reveal">${ textInClear }</p>`;
}
// function rot13( s ) {
//     return s.replace( /[a-zA-Z]/g, ( c ) => String.fromCharCode( ( c <= "Z" ? 90 : 122 ) >= ( c = c.charCodeAt( 0 ) + 13 ) ? c : c - 26 ) );
// }
function cryptid( args){
    let message;
    let argText = args.join(' ').replace(/(?=['"<>/\\])/gm,'\\');
    let crypt = argText.match(/(de|en)crypt/gmi)[0];
    let plainText = argText.match(/(?<=msg: ).*(?= key: )|(?<=msg: ).*(?! key: )/gmi)[0];
    let keyText = argText.match(/(?<=key: ).*(?= msg: )|(?<=key: ).*(?! msg: )/gmi)[0];
    let usage = "<p>Usage: (ENCRYPT)|(DECRYPT) msg: (MESSAGE TEXT) key: (KEY TEXT)</p>";
    console.log("Just a heads up, you'll likely need to escape \\'s since...well...you know...")
    if (crypt.length == 0){return usage}
    switch(/^d/i.test(crypt)){
        case true : message = autodekey(plainText,keyText);
        break;

        case false : message = autokey(plainText,keyText);
        break;
        
        };

    return `<p class="hack-reveal">${ message }</p>`
};
function emod(n, m){
    let r = n % m;
    if( r<0){
        r = (m<0) ? r - m : r + m;
    };
    return r
};
function autokey(msg,key){
    let keystream = key+msg, out='';
    for(let i = 0; i < msg.length; i++){
        let p = msg.charCodeAt(i);
        let k = keystream.charCodeAt(i);
        let c = (p + k - 64) % 95 + 32;
        out += String.fromCharCode(c);
    }
    return out;
};
function autodekey(msg,key){
    let keystream = key,out='';
    for(let i = 0; i < msg.length; i++){
        let c = msg.charCodeAt(i);
        let k = keystream.charCodeAt(i);
        let p = emod(c-k,95);
        p += 32;
        out += String.fromCharCode(p);
        keystream += String.fromCharCode(p);
    }
    return out;
};
function oracle( args){
    return args.join(' and ')
}