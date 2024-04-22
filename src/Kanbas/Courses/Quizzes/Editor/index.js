import React , {useEffect, useState} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { HiOutlineBan,HiCheckCircle } from "react-icons/hi";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import {Editor} from "@tinymce/tinymce-react";
import * as client from "../client";
import { fetchQuizById } from "../client";
function QuizzDetailsEditor() {


    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [quiz, setQuiz] = useState({
        quizType: "Graded Quiz",
        assignmentGroup:"QUIZZES",
        timeLimit: "20 Minutes",
        isTimeLimitEnabled: true,
        shuffleAnswers: true,
        multipleAttempts: false,
        showCorrectAnswers:"Immediately",
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        oneQuestionAtATime: true,
        published: false,
    });

    useEffect(()=>{
        if(quizId && quizId !== "new"){
            fetchQuizById(courseId, quizId)
            .then(QuizDetails =>{
                setQuiz({
                    _id: QuizDetails._id,
                    description: QuizDetails.description,
                    course: QuizDetails.course,
                    title: QuizDetails.title,
                    quizType: QuizDetails.quizType || "Graded Quiz",
                    points: QuizDetails.points,
                    assignmentGroup: QuizDetails.assignmentGroup || "QUIZZES",
                    shuffleAnswers: QuizDetails.shuffleAnswers!== undefined ? QuizDetails.shuffleAnswers : true,
                    timeLimit: QuizDetails.timeLimit,
                    isTimeLimitEnabled: QuizDetails.isTimeLimitEnabled !== undefined ? QuizDetails.isTimeLimitEnabled : true,
                    multipleAttempts: QuizDetails.multipleAttempts !== undefined ? QuizDetails.multipleAttempts : false,
                    showCorrectAnswers: QuizDetails.showCorrectAnswers || "Immediately",
                    accessCode: QuizDetails.accessCode,
                    oneQuestionAtATime: QuizDetails.oneQuestionAtATime !== undefined ? QuizDetails.oneQuestionAtATime : true,
                    webcamRequired: QuizDetails.webcamRequired !== undefined ? QuizDetails.webcamRequired : false,
                    lockQuestionsAfterAnswering: QuizDetails.lockQuestionsAfterAnswering !== undefined ? QuizDetails.lockQuestionsAfterAnswering : false,
                    dueDate: QuizDetails.dueDate,
                    availableDate: QuizDetails.availableDate,
                    untilDate: QuizDetails.untilDate,
                    published: QuizDetails.published!== undefined ? QuizDetails.published : false,
                });
            
            })
            .catch(error => {
                console.error("Error fetching quiz:", error);
            });
        }
        else{
            //quiz database id / _id ??? 
            if(quiz._id !== null){
                setQuiz({
                    _id: quiz.length + 1, 
                    description: "", 
                    course: courseId,
                    title: "",
                    quizType: "Graded Quiz",
                    points: 100,
                    assignmentGroup: "QUIZZES",
                    shuffleAnswers: true,
                    timeLimit: "20 Minutes",
                    multipleAttempts: false,
                    showCorrectAnswers: "Immediately",
                    accessCode: "",
                    oneQuestionAtATime: true,
                    webcamRequired: false,
                    lockQuestionsAfterAnswering: false,
                    dueDate: "",
                    availableDate: "",
                    untilDate: ""

                });
            }
        }
    },[courseId, quizId, quiz._id])

    // quiz description part
    const [editorConent, setEditorContent] = useState('')

    useEffect(()=>{
        setEditorContent(quiz.description);
    },[quiz.description]);

    const handleEditorChange = (newValue, editor) => {
        setEditorContent(newValue);
        setQuiz(quiz =>({
            ...quiz,
            description: newValue,
        }));
    };

    //done
    const handleSave = () => {
        console.log("Saving quizDetails:", quiz);
    
        const saveOperation =
          quizId === "new"
            ? client.createQuiz(courseId, quiz) // Create a new quiz
            : client.updateQuizDetails(courseId, quizId, quiz); // Update existing quiz
    
        saveOperation
          .then(() => {
            // After a successful operation, navigate back to details page
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
          })
          .catch((error) => {
            // Log any errors encountered during the save operation
            console.error("Error saving quiz:", error);
          });
      };
    
    // done
    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    }

    // done
    const handleSaveandPublish = () => {
        console.log("Saving quizDetails:", quiz);

        if(!quiz.published) {
            quiz.published = true;
        }
    
        const saveOperation =
          quizId === "new"
            ? client.createQuiz(courseId, quiz) // Create a new quiz
            : client.updateQuizDetails(courseId, quizId, quiz); // Update existing quiz details
    
        saveOperation
          .then(() => {
            // After a successful operation, navigate back to the list of quizzes
            navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
          })
          .catch((error) => {
            // Log any errors encountered during the save operation
            console.error("Error saving quiz:", error);
          });
    }

    const handleTitleChange = ((e) => {
        setQuiz({
            ...quiz,
            title: e.target.value,
        });
    });

    const handleQuizTypeChange = ((e) => {
        setQuiz({
            ...quiz,
            quizType: e.target.value,
        })
    })

    const handleAssignmentGroupChange = ((e)=>{
        setQuiz({
            ...quiz,
            assignmentGroup: e.target.value,
        })
    });

    const handleToPointsChange = ((e) => {
        setQuiz({
            ...quiz,
            points: parseInt(e.target.value),
        });
    });

    const handleTimeLimitChange = ((e) => {
        setQuiz({
            ...quiz,
            timeLimit: e.target.value,
        });
    });

    const toogleTimeLimit = ((e) => {
        const isChecked = e.target.checked;
        setQuiz({
            ...quiz,
            isTimeLimitEnabled: isChecked,
            timeLimit: isChecked ? quiz.timeLimit : "",
        });
    });

    const handleShuffleAnswersChange = ((e)=>{
        setQuiz({
            ...quiz,
            shuffleAnswers: e.target.checked,
        });
    })

    const handleMultipleAttemptsChange = ((e) => {
        setQuiz({
            ...quiz,
            multipleAttempts: e.target.checked,
        });
    });

    const handleShowCorrectAnswerChange = ((e)=>{
        setQuiz({
            ...quiz,
            showCorrectAnswers: e.target.value,
        });
    })

    const handleOneQuestionAtATimeChange = ((e) => {
        setQuiz({
            ...quiz,
            oneQuestionAtATime: e.target.checked,
        });
    });

    const handleWebcamRequiredChange = ((e) => {
        setQuiz({
            ...quiz,
            webcamRequired: e.target.checked,
        });
    });

    const handleLockQuestionsAfterAnsweringChange = ((e) => {
        setQuiz({
            ...quiz,
            lockQuestionsAfterAnswering: e.target.checked,
        });
    });

    const handleAccessCodeChange = ((e) => {
        setQuiz({
            ...quiz,
            accessCode: e.target.value,
        });
    })

    const handleDueChange = ((e) => {
        setQuiz({
            ...quiz,
            dueDate: e.target.value,
        });
    });

    const handleAvailableDueChange = ((e) => {
        setQuiz({
            ...quiz,
            availableDate: e.target.value,
        });
    });

    const handleUntilDateChange = ((e) => {
        setQuiz({
            ...quiz,
            untilDate: e.target.value,
        });
    });

    return (
        <>
            <div className="d-flex justify-content-end align-items-center me-4 ">
                <div className = "me-3">
                    Points {quiz.points}
                </div>

                {quiz.published ? (
                    <div className="me-3" style={{color:'green'}}>
                        <HiCheckCircle /> Published
                    </div>
                ):(
                    <div className="me-3" style={{ color: 'gray' }}>
                        <HiOutlineBan /> Not Published
                    </div>
                )}
                <button type="button" className="btn btn-outline-dark btn-light">
                    <HiEllipsisVertical />
                </button>
            </div>
            <hr className="me-4" />

            {/* ------------Tab------------------- */}
            <div>
                <nav class = "nav nav-tabs mt-2">

                    <Link class="nav-link active"
                          to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Details`}>
                        Details
                    </Link>
                    <Link  class="nav-link" style={{ color: "red" }}
                      to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`}>
                      Questions
                    </Link>
                </nav>
                <br/>
            </div>
            
            <div>
                {/* ------------Quiz title------------------- */}
                <input id = "quizTitle" className="form-control mb-2" placeholder="Unnamed Quiz"
                    value={quiz.title} 
                    onChange={handleTitleChange} 
                /> <br/>
                
                {/* ------------Quiz instructions editor------------------- */}
                Quiz Instructions: <br/>
                <Editor 
                    apiKey="81zmyhxc6njj4nq5jzzfeq4h70yojjr4aki254xmhai5dcwz"
                    value ={editorConent}
                    onEditorChange = {handleEditorChange}
                    // onInit = {(evt, editor)=>{
                    //     setText(editor.getContent({format:'text'}));
                    // }}
                    init = {{
                        plugins:"a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount"
                    }}
                        
                />
  
            </div>
            <div className="container">
                <div className="d-flex justify-content-left">
                    <div className="w-75">
                        {/* ----------Quiz Type---------------- */}
                        <div className="mt-4 row">
                            <label htmlFor="quiz-type" className="col-sm-4 col-form-label text-end">Quiz Type</label>
                            <div className="col-sm-8">
                                <select className="form-select" id="quiz-type" 
                                        value={quiz.quizType} 
                                        onChange={handleQuizTypeChange}>
                                    <option value = "gradedQuiz">Graded Quiz</option>
                                    <option value="practiceQuiz">Practice Quiz</option>
                                    <option value="survey">Graded Survey</option>
                                    <option value="ungradedSurvey">Ungraded Survey</option>
                                </select>
                            </div>
                        </div>
                        {/* ---------------Assignment Group-------------------- */}
                        <div className="mt-4 row">
                            <label htmlFor="quiz-group" className="col-sm-4 col-form-label text-end">Assignment Group</label>
                            <div className="col-sm-8">
                                <select className="form-select" id="quiz-group"
                                    value={quiz.assignmentGroup}
                                    onChange={handleAssignmentGroupChange}
                                >
                                    <option value="quizzes">QUIZZES</option>
                                    <option value="assignments">ASSIGNMENTS</option>
                                    <option value="exams">EXAMS</option>
                                    <option value="project">PROJECT</option>
                                </select>
                            </div>
                        </div>
                        {/* -----------Points----------------- */}
                        <div className="mt-4 row">
                            <label htmlFor="quiz-points" className="col-sm-4 col-form-label text-end">Points</label>
                            <div className="col-sm-8">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="points" 
                                    min="0" 
                                    max="100" 
                                    placeholder="100"
                                    value={quiz.points}
                                    onChange = {handleToPointsChange} 
                                    />
                            </div>
                        </div>
                        <div className="mt-4 row">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-8">
                                {/* --------------Options---------------- */}
                                <b>Options</b>
                                <div className="form-check mt-2">
                                    <input className="form-check-input" type="checkbox" id="shuffle-answer"
                                           checked={quiz.shuffleAnswers}
                                           onChange={handleShuffleAnswersChange} />
                                    <label className="form-check-label" htmlFor="shuffle-answer">Shuffle Answers</label>
                                </div>
                                {/* -------------Time Limit------------------ */}
                                <div className="form-check mt-4">
                                    <input className="form-check-input" type="checkbox" id="time-limit" 
                                            checked={quiz.isTimeLimitEnabled || false}
                                            onChange={toogleTimeLimit}
                                    />
                                    <label className="form-check-label" htmlFor="time-limit">Time Limit:</label>
                                    <input className="time-input" id="time-value" 
                                               value = {quiz.timeLimit || ''}
                                               min={1}
                                               onChange = {handleTimeLimitChange}/>
                                </div>
                                {/* -------------Multiple Attempts------------------ */}
                                <div className = "border p-1 mt-3">
                                    <div className = "mb-1 ">
                                        <input className="form-check-input" type="checkbox" id="multiple-attempt"
                                               checked = {quiz.multipleAttempts}
                                               onChange={handleMultipleAttemptsChange}/>
                                        <label className="form-check-label" htmlFor="multiple-attempt">Allow Multiple Attempts</label> 
                                    </div>
                                </div>

                                <div className="form-check mt-2">
                                    <label htmlFor="show-answer">Show Correct Answers: </label>
                                    <input id="show-answer"
                                           value={quiz.showCorrectAnswers}
                                           onChange={handleShowCorrectAnswerChange}/>
                                </div>
                                <div className="form-check mt-2">
                                    <input className="form-check-input" type="checkbox" id="one-question"
                                           checked={quiz.oneQuestionAtATime}
                                           onChange={handleOneQuestionAtATimeChange} />
                                    <label className="form-check-label" htmlFor="one-question">One Question at a Time</label>
                                </div>
                                <div className="form-check mt-2">
                                    <input className="form-check-input" type="checkbox" id="webcam"
                                           checked={quiz.webcamRequired}
                                           onChange={handleWebcamRequiredChange}/>
                                    <label className="form-check-label" htmlFor="webcam">Webcam Required</label>
                                </div>
                                <div className="form-check mt-2">
                                    <input className="form-check-input" type="checkbox" id="lock-question"
                                           checked={quiz.lockQuestionsAfterAnswering}
                                           onChange={handleLockQuestionsAfterAnsweringChange} />
                                    <label className="form-check-label" htmlFor="lock-question">Lock Questions After Answering</label>
                                </div>
                                <div className="form-check mt-2">
                                    <label htmlFor="access-code"> Access Code: </label>
                                    <input type="text" id="access-code" name = "access-code" value = {quiz.accessCode} onChange={handleAccessCodeChange}/>
                                </div>
                            </div>
                        </div>
                        
                        {/* -----------------Assign To Part ------------------- */}
                        <div className="mt-4 row">
                            <label htmlFor="assignment-assign" className="col-sm-4 col-form-label text-end">Assign</label>
                            <div className="col-sm-8 border p-3">
                                <div className="mb-1">
                                    <label htmlFor="assign-to" className="fw-bold col-form-label text-start">Assign To</label>
                                    <input className="form-control pb-2" id="assign-to" value="Everyone" />
                                </div>

                                {/* Three Date. */}
                                <div className="mb-1">
                                    <label htmlFor="quiz-due" className="fw-bold col-form-label text-start">Due</label>
                                    <input className="form-control pb-2" id="quiz-due" type="date"
                                           value={quiz.dueDate}
                                           onChange={handleDueChange} />

                                    <div className="row mb-1">
                                        <div className="col">
                                            <label htmlFor="quiz-available-from" className="fw-bold col-form-label text-start">Available from</label>
                                            <input className="form-control pb-2" id="quiz-available-from" type="date" 
                                                value={quiz.availableDate}
                                                onChange={handleAvailableDueChange} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="quiz-available-until" className="fw-bold col-form-label text-start">Until</label>
                                            <input className="form-control pb-2" id="quiz-available-until" type="date"
                                                   value={quiz.untilDate}
                                                   onChange={handleUntilDateChange} />
                                        </div>
                                    </div>
                                    <div className="mb-1 row">
                                        <button type="button" className="w-100 btn btn-outline-secondary btn-light mt-3">+ Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <hr/>
            <form>
               <div className="d-flex justify-content-between align-items-center">
                    <label className="d-flex align-items-center">
                        <input type="checkbox" className="me-1" />Notify users this quiz has changed
                    </label>
                    <div>
                        <button 
                            type="button" 
                            onClick={handleCancel} 
                            className="btn btn-secondary btn-outline-dark btn-lg btn-light me-2">
                            Cancel
                        </button>

                        <button 
                            type="button" 
                            onClick={handleSaveandPublish} 
                            className="btn btn-secondary btn-outline-dark btn-lg btn-light me-2">
                            Save & Publish
                        </button>

                        <button 
                            type="button" 
                            onClick={handleSave} 
                            className="btn btn-primary btn-lg btn-danger ">
                            Save
                        </button>
                        
                    </div>
               </div> 
            </form>
            <hr/>
        </>
            );
}
export default QuizzDetailsEditor;