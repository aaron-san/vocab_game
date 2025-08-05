"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const sentenceList = [
  ["I", "love", "building", "typing", "games"],
  ["Learning", "JavaScript", "can", "be", "fun"],
  ["React", "makes", "UI", "development", "easier"]
];


const SentenceBuilder = () => {
  const [words, setWords] = useState<string[]>([]);
const [sentenceIndex, setSentenceIndex] = useState(0);
const [score, setScore] = useState(0);
const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

useEffect(() => {
  const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);
  setWords(shuffleArray(sentenceList[sentenceIndex]));
}, [sentenceIndex]);


  const handleDrop = (result: any) => {
    if (!result.destination) return;
    const updated = [...words];
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setWords(updated);
  };

 const checkSentence = () => {
  const currentSentence = sentenceList[sentenceIndex];
  const correct = words.join(" ") === currentSentence.join(" ");
  setIsCorrect(correct);

  if (correct) {
    setScore((prev) => prev + 10);
    setTimeout(() => {
      if (sentenceIndex < sentenceList.length - 1) {
        setSentenceIndex((prev) => prev + 1);
        setIsCorrect(null);
      } else {
        alert("🎉 You've completed all levels!");
      }
    }, 1000);
  }
};

  return (
    <div className="space-y-4 mx-auto p-4 max-w-lg text-center">
      <h2 className="font-semibold text-xl">言葉を並べてください:</h2>
      <div className="text-secondary text-sm">
  Level {sentenceIndex + 1} of {sentenceList.length} • Score: {score}
</div>

      <DragDropContext onDragEnd={handleDrop}>
        <Droppable
          droppableId="sentence"
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping={true}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-wrap justify-center gap-2 bg-stone-700 p-4 border border-background rounded-md h-2xl"
            >
              {words.map((word, index) => (
                <Draggable
                  key={word + index}
                  draggableId={word + index}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-sky-100 shadow px-2 py-1 rounded min-w-[40px] text-primary text-2xl cursor-move"
                    >
                      {word}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={checkSentence}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
      >
        Check Sentence
      </button>

      {isCorrect !== null && (
        <div
          className={`mt-4 text-lg font-bold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? "✅ Correct!" : "❌ Try again!"}
        </div>
      )}
    </div>
  );
};

export default SentenceBuilder;
