import React, { useContext } from 'react';
import { oSContext } from '../context/Context';
import { motion } from 'framer-motion'

const Journal = () => {
  const { challenges } = useContext(oSContext);


  return (
    <div className="journal-page">
      <h2>Journal Entries</h2>
      <div className="journal-content">

        {
          challenges.map((challenge, i) => {
            return (
              <div key={i} className="journal-card">
                <h4>{challenge.title}</h4>
                <div className="log-list">
                  {
                    challenge.logs.length == 0 ? (
                      <p>No jounal entries yet...</p>
                    ) : (
                      challenge.logs.map((log, j) => {
                        const isEven = j % 2 == 0;

                        return (
                          <motion.div
                            key={j}
                            className="log-card"
                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: j * 0.05 }}
                          >

                            <p className="log-date">{log.date}</p>
                            <p className="log-text">{log.text}</p>
                          </motion.div>
                        )
                      })
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Journal;
