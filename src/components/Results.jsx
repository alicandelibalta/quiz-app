// src/components/Results.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import "../styles/results.scss"

const QuizResults = () => {
  const location = useLocation();
  const { answers } = location.state || { answers: [] };

  return (
    <TableContainer className='table-container' component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Questions</b></TableCell>
            <TableCell><b>Answers</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {answers.map((answer, index) => (
            <TableRow key={index}>
              <TableCell>{answer.id ? `${answer.id} - ${answer.question}` : answer.question || "Question not found"}</TableCell>
              <TableCell>{answer?.answer || "No answer"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuizResults;
