// Declare some variables
var node;               //used to store question read from db
var yes;
var path = 'question/mammal';



// FIREBASE SET UP
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCQK1UqBY348E88CKP2kuyisWRn29zENEM",
    authDomain: "fireclick2.firebaseapp.com",
    databaseURL: "https://fireclick2.firebaseio.com",
    projectId: "fireclick2",
    storageBucket: "",
    messagingSenderId: "1062287029196"
};

// Inject configuration into firebase object
firebase.initializeApp(config);

// Print the object for success confirmation
console.log(firebase);

// Initialize the database
var database = firebase.database();

// Set up the root of the tree
var ref = database.ref('question');





// FUNCTIONS
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------


// WRITE USER DATA
// arg1 = path as string to node to be inserted ('questions/mammal/left/human')
// -----------------------------------------------------------------
function writeUserData(userId, question, left, right, leaf, callback) {
    firebase.database().ref('question/' + userId).set({
    question: question,
  });

}


// READNODE
// arg1 = path as string to desired node in tree ('questions/mammal/left/human')
// arg2 = callback function if needed.
// This function stores the desired node object in variable node
// -----------------------------------------------------------------
function readNode(path, callback, callback2) {
    (firebase.database().ref(path).once('value')
        .then(function(snapshot) {
            node = snapshot.val();
            callback();
        }))
}








// MAIN
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
readNode(path, displayToScreen);

function displayToScreen() {
        document.getElementById('questionP').innerText = node.question;
        main();
}

function main() {  

    path += '/left/' + Object.keys(node.left)[0];              //Store id of build path
    node.left[Object.keys(node.left)];                    //Get the object from left        

    console.log(path);
    console.log(node.left[Object.keys(node.left)]);
}



// BUTTON HANDLERS
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

document.getElementById('yes').onclick = handleYes;
document.getElementById('no').onclick = handleNo;

function handleYes() {
    yes = true;
}

function handleNo() {
    yes = false;
}
























//writeUserData('mammal/right/shark', 'is it the shark?');

// Update specific fields
//firebase.database().ref('question/mammal').update({leaf: true});








// Read the object human

// 1 & 2
// var a;
// firebase.database().ref('/question/mammal/left/human').once('value')
//   .then(function(snapshot){
//     a = snapshot.val();
//     return;
// }).then(function() {firebase.database().ref('/question/mammal/left/human').remove();})
//   .then(function() {writeUserData('mammal/left/2feet', 'does it stand in two feet?');})
//   .then(function() {writeUserData('mammal/left/2feet/left/human', a.question);})
//   .then(function() {writeUserData('mammal/left/2feet/right/rat', "Is it the rat?");})









// 3 Stick inteligent object
//writeUserData('mammal/left/2feet', 'does it stand in two feet?');

// 4 reattach human to left of 2feet
//writeUserData('mammal/left/2feet/left/human', "Is it the human?");

// 5 insert new rat to right of 2 feet
// writeUserData('mammal/left/2feet/right/rat', "Is it the rat?");
