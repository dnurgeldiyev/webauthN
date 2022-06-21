import $ from "./jquery-3.2.1.min"
import base64js from "./base64"

// Encode an ArrayBuffer into a base64 string.
function bufferEncode(value) {
    return base64js.fromByteArray(value)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

// Don't drop any blanks
// decode
function bufferDecode(value) {
    return Uint8Array.from(atob(value), c => c.charCodeAt(0));
}

export function makeCredential(makeCredentialOptions) {
    console.log("Fetching options for new credential");

    makeCredentialOptions.publicKey.challenge = bufferDecode(makeCredentialOptions.publicKey.challenge);
    makeCredentialOptions.publicKey.user.id = bufferDecode(makeCredentialOptions.publicKey.user.id);
    if (makeCredentialOptions.publicKey.excludeCredentials) {
        for (var i = 0; i < makeCredentialOptions.publicKey.excludeCredentials.length; i++) {
            makeCredentialOptions.publicKey.excludeCredentials[i].id = bufferDecode(makeCredentialOptions.publicKey.excludeCredentials[i].id);
        }
    }
    console.log("Credential Creation Options");
    console.log(makeCredentialOptions);
    navigator.credentials.create({
        publicKey: makeCredentialOptions.publicKey
    }).then(function (newCredential) {
        console.log("PublicKeyCredential Created");
        console.log(newCredential);
        registerNewCredential(newCredential);
    }).catch(function (err) {
        console.info(err);
    });

}

// This should be used to verify the auth data with the server
function registerNewCredential(newCredential) {
    // Move data into Arrays incase it is super long
    let attestationObject = new Uint8Array(newCredential.response.attestationObject);
    let clientDataJSON = new Uint8Array(newCredential.response.clientDataJSON);
    let rawId = new Uint8Array(newCredential.rawId);

    $.ajax({
        url: 'api/user/make-credential',
        type: 'POST',
        data: JSON.stringify({
            id: newCredential.id,
            rawId: bufferEncode(rawId),
            type: newCredential.type,
            response: {
                attestationObject: bufferEncode(attestationObject),
                clientDataJSON: bufferEncode(clientDataJSON),
            },
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response)
        }
    });
}

export function getAssertion(makeAssertionOptions) {

    console.log("Assertion Options:");
    console.log(makeAssertionOptions);
    makeAssertionOptions.publicKey.challenge = bufferDecode(makeAssertionOptions.publicKey.challenge);
    makeAssertionOptions.publicKey.allowCredentials.forEach(function (listItem) {
        listItem.id = bufferDecode(listItem.id)
    });
    console.log(makeAssertionOptions);
    navigator.credentials.get({
        publicKey: makeAssertionOptions.publicKey
    })
        .then(function (credential) {
            console.log(credential);
            verifyAssertion(credential);
        }).catch(function (err) {
        console.log(err.name);
    });

}

function verifyAssertion(assertedCredential) {
    // Move data into Arrays incase it is super long
    console.log('calling verify')
    let authData = new Uint8Array(assertedCredential.response.authenticatorData);
    let clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON);
    let rawId = new Uint8Array(assertedCredential.rawId);
    let sig = new Uint8Array(assertedCredential.response.signature);
    let userHandle = new Uint8Array(assertedCredential.response.userHandle);
    $.ajax({
        url: 'api/user/make-assertion',
        type: 'POST',
        data: JSON.stringify({
            id: assertedCredential.id,
            rawId: bufferEncode(rawId),
            type: assertedCredential.type,
            response: {
                authenticatorData: bufferEncode(authData),
                clientDataJSON: bufferEncode(clientDataJSON),
                signature: bufferEncode(sig),
                userHandle: bufferEncode(userHandle),
            },
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response)
        }
    });
}
