function parseGoal(input){

const lowerInput = input.toLowerCase()

// detect weeks
let weeks = 4
const weekMatch = lowerInput.match(/(\d+)\s*week/)

if(weekMatch){
weeks = parseInt(weekMatch[1])
}

// detect months
const monthMatch = lowerInput.match(/(\d+)\s*month/)
if(monthMatch){
weeks = parseInt(monthMatch[1]) * 4
}

// remove common phrases
let goal = lowerInput
.replace(/i want to learn/g,"")
.replace(/teach me/g,"")
.replace(/\blearn\b/g, "") 
.replace(/\bstudy\b/g, "")
.replace(/in \d+ weeks?/g,"")
.replace(/in \d+ months?/g,"")
.trim()

return {
goal,
weeks
}

}

module.exports = parseGoal