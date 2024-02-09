'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className='page-container'>
      <h1>Copy writer bot for personas</h1>
      <p>
        Welcome to the copy writer bot for personas. Enter a company name and
        the bot will give you a great sales pitch for a specific product based
        on the target audience.
      </p>
      <br />
      <hr />
      <br />
      <div>
        {messages.map((m) => (
          <>
            <div
              key={m.id}
              style={{ whiteSpace: 'preserve', marginBottom: 12 }}
            >
              <strong>{m.role === 'user' ? 'Company' : 'Copy Writer'}:</strong>{' '}
              {m.content}
            </div>

            {m.role === 'assistant' && <hr />}
          </>
        ))}

        <form onSubmit={handleSubmit}>
          <label htmlFor='Company'>
            <strong>Company Name: </strong>
          </label>
          <input
            id='Company'
            value={input}
            placeholder='Enter the exact name of a company'
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
