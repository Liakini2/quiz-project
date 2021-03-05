// import axios from 'axios'
// import {useState, useEffect} from 'react'

// //Redux
// import {connect} from 'react-redux'

// //Routing
// // import {Redirect} from 'react-router-dom'

// //material ui styling and form
// import Container from '@material-ui/core/Container'
// import TextField from '@material-ui/core/TextField'
// import {makeStyles} from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'

// //spacing for form
// const useStyles = makeStyles((theme)=>({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1)
//         }
//     },
//     button: {
//         margin: theme.spacing(1)
//     }
// }))

// const AddResults=({...props})=>{
//     const classes= useStyles()

//     useEffect(()=>{
//         axios.get(`/api/question/${match.params.question_id}`)
//         .then(({data})=>{
//             //
//             console.log(data)
//         })
//     },[])  

//     const addResults=()=>{
//         axios.post(`/api/answer/${}`, {})
//             .then(({data})=>{
//                 addResults(data)
//                 history.push(`/myquizzes`)
//             })
//             .catch((err)=>console.log(err))
//     }
     
//     const handleSubmit=(e)=>{
//         e.preventDefault()
//     }

//     return(
//         <Container>
//             <h1>Add Your Answers Here:</h1>
//             <form 
//             onSubmit={handleSubmit}
//             className={classes.root}>
//                 <TextField
//                 name='result'
//                 label='Result A'
//                 variant='filled'
//                 value={}
//                 onChange={(e)=>(e.target.value)}
//                 />
//                 <TextField
//                 name='result'
//                 label='Result B'
//                 variant='filled'
//                 value={}
//                 onChange={(e)=>(e.target.value)}
//                 />
//                 <TextField
//                 name='answer'
//                 label='Answer C'
//                 variant='filled'
//                 value={answerC}
//                 onChange={(e)=>(e.target.value)}
//                 />
//                 <TextField
//                 name='answer'
//                 label='Answer D'
//                 variant='filled'
//                 value={}
//                 onChange={(e)=>(e.target.value)}
//                 />
//                 <Button
//                 className={classes.button} 
//                 variant='contained' 
//                 color='primary' 
//                 type='submit' 
//                 onClick={()=>{
//                     addResults()
//                 }}>
//                     Submit Your Quiz
//                 </Button>
//                 <p>Don't worry if your quiz is incomplete or you need to change something. You can edit and delete your quizzes after submition in the myQuizzes page found on your profile.</p>
//             </form>
//         </Container>
//     )
// }

// const mapStateToProps=(store)=>{return store}

// export default connect(mapStateToProps, {})(AddResults)