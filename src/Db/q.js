// import question from './new_question_data'

var a = require('indefinite');
const adjectives_of_person = [
    "adaptable",
    "adventurous",
    "affable",
    "affectionate",
    "agreeable",
    "ambitious",
    "amiable",
    "amicable",
    "amusing",
    "brave",
    "bright",
    "broad-minded",
    "calm",
    "careful",
    "charming",
    "communicative",
    "compassionate",
    "conscientious",
    "considerate",
    "convivial",
    "courageous",
    "courteous",
    "creative",
    "decisive",
    "determined",
    "diligent",
    "diplomatic",
    "discreet",
    "dynamic",
    "easygoing",
    "emotional",
    "energetic",
    "enthusiastic",
    "exuberant",
    "fair-minded",
    "faithful",
    "fearless",
    "forceful",
    "frank",
    "friendly",
    "funny",
    "generous",
    "gentle",
    "good",
    "gregarious",
    "hard-working",
    "helpful",
    "honest",
    "humorous",
    "imaginative",
    "impartial",
    "independent",
    "intellectual",
    "intelligent",
    "intuitive",
    "inventive",
    "kind",
    "loving",
    "loyal",
    "modest",
    "neat",
    "nice",
    "optimistic",
    "passionate",
    "patient",
    "persistent",
    "pioneering",
    "philosophical",
    "placid",
    "plucky",
    "polite",
    "powerful",
    "practical",
    "pro-active",
    "quick-witted",
    "quiet",
    "rational",
    "reliable",
    "reserved",
    "resourceful",
    "romantic",
    "self-confident",
    "self-disciplined",
    "sensible",
    "sensitive",
    "shy",
    "sincere",
    "sociable",
    "straightforward",
    "sympathetic",
    "thoughtful",
    "tidy",
    "tough",
    "unassuming",
    "understanding",
    "versatile",
    "warmhearted",
    "willing",
    "witty"
]
var a = require('indefinite')
questions=[]
for (let i=0;i<100;i++){
    try {
        questions.push(`Who looks like ${a(adjectives_of_person[i])} person ?`)
    } catch (error) {
        console.log(error)
    }
    
}
console.log(questions)













// var chance = require('chance')
// var a = require('indefinite')
// c = new chance()
// var q=[]
// console.log(c.profession())
// for (let i=0;i<100;i++){
//     q.push(`Who seems to work as ${a(c.profession())} ?`)
// }
// console.log(q)

















