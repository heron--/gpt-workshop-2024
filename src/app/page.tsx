import Link from 'next/link';

export default function Home() {
  return (
    <div className='page-container'>
      <h1>Welcome to the GPT Workshop</h1>
      <p>This is the submission for team Hammerhead</p>
      <p>
        Visit <Link href='/chat'>copy writer bot</Link> to hear great sales
        pitches based on audience!!! Maybe the best ever ¯\_(ツ)_/¯ ?
      </p>
    </div>
  );
}
