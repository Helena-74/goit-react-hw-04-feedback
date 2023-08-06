import React, { Component } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

class App extends Component {
  state = {
    feedback: { good: 0, neutral: 0, bad: 0 }
  };

  handleLeaveFeedback = option => {
    this.setState(prevState => ({
      feedback: { ...prevState.feedback, [option]: prevState.feedback[option] + 1 }
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state.feedback;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    const { good } = this.state.feedback;
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  render() {
    const { feedback } = this.state;
    const { good, neutral, bad } = feedback;
    const totalFeedback = this.countTotalFeedback();

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <div>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={['good', 'neutral', 'bad']}
              onLeaveFeedback={this.handleLeaveFeedback}
            />
          </Section>

          {totalFeedback > 0 ? (
            <Section title="Statistics">
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={totalFeedback}
                positivePercentage={this.countPositiveFeedbackPercentage()}
              />
            </Section>
          ) : (
            <Notification message="There is no feedback" />
          )}
        </div>
      </div>
    );
  }
}

export default App;

// import React, { useState } from 'react';
// import Statistics from './Statistics/Statistics';
// import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
// import Section from './Section/Section';
// import Notification from './Notification/Notification';

// export const App = () => {
//   const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

//   const handleLeaveFeedback = option => {
//     setFeedback(prevFeedback => ({ ...prevFeedback, [option]: prevFeedback[option] + 1 }));
//   };

//   const { good, neutral, bad } = feedback;
//   const total = good + neutral + bad;
//   const positivePercentage = total === 0 ? 0 : Math.round((good / total) * 100);

//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       <div>
//         <Section title="Please leave feedback">
//           <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={handleLeaveFeedback} />
//         </Section>

//         <Section title="Statistics">
//           {total === 0 ? (
//             <Notification message="There is no feedback" />
//           ) : (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           )}
//         </Section>
//       </div>
//     </div>
//   );
// };

// export default App;