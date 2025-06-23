import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { oSContext } from '../context/Context';
import { toast } from 'react-toastify';
import api from '../services/api';
import {motion} from 'framer-motion'

const ChallengeDetail = () => {
  const { id } = useParams();
  const { challenges,setChallenges } = useContext(oSContext);
  const challenge = challenges.find(c => c.id === parseInt(id));
  console.log(challenge)
  const [editing, setEditing] = useState(false)
  const [editedTasks, setEditedTasks] = useState(challenge.dailyTasks || '')
  const [editedRules, setEditedRules] = useState(challenge.rules || '')
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`challenges/${challenge.id}/`, {
        ...challenge,
        dailyTasks: editedTasks,
        rules: editedRules
      });
      toast('Challenge updated successfully!');
      setEditing(false);

      setChallenges(prev=>
        prev.map(ch=>{
          if(ch.id=== challenge.id){
            return {...challenge,dailyTasks:editedTasks,rules:editedRules}
          }
          return ch
        })
      )
      
    } catch (err) {
      toast.error('Failed to update challenge');
      console.error(err);
    }
  };


  if (!challenge) return <p>Challenge not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="challenge-detail"
    >
    <div className="challenge-detail">
      <h2>{challenge.title}</h2>
      <p><strong>Goal:</strong> {challenge.goal}</p>
      <p><strong>Description:</strong> {challenge.description}</p>
      <p><strong>Rules:</strong></p>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{challenge.rules}</pre>
      <p><strong>Daily Tasks:</strong></p>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{challenge.dailyTasks}</pre>
      <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditing(true)}
            className='edit-button' >Edit</motion.button>
      {
        editing && (
          <form className='challenge-form' onSubmit={handleUpdate}>
            <div>
              <label>Daily Tasks</label>
              <textarea value={editedTasks} onChange={(e) => setEditedTasks(e.target.value)} />
            </div>
            <div>
              <label>Rules</label>
              <textarea value={editedRules} onChange={(e) => setEditedRules(e.target.value)} />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              type="submit">Save Changes</motion.button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditing(false)}
              style={{marginLeft:'10px'}} 
              type="button" 
              >Cancel</motion.button>
          </form>
        )
      }
    </div >
    </motion.div>
  );
};

export default ChallengeDetail;
