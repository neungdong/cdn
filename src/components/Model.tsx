// // src/app/components/Model.tsx
// export const generateContent = async (prompt: string) => {
//   const response = await fetch('/api/gemini', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ prompt })
//   });

//   if (!response.ok) {
//     throw new Error("Failed to generate content");
//   }

//   const data = await response.json();
//   return data.text; // string
// };
// src/app/components/Model.tsx
export const generateContent = async (prompt: string) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate content');
  }

  const data = await response.json();
  return data.text; 
};
