import { motion } from 'framer-motion';
// Helper function to get the ordinal indicator for a given number
const getOrdinalIndicator = (number) => {
  const remainder10 = number % 10;
  const remainder100 = number % 100;
  if (remainder10 === 1 && remainder100 !== 11) {
    return 'st';
  } else if (remainder10 === 2 && remainder100 !== 12) {
    return 'nd';
  } else if (remainder10 === 3 && remainder100 !== 13) {
    return 'rd';
  }
  return 'th';
};
export default function PodiumStep({ podium, winner }) {
  const offset = podium.length - winner.position;
  const positionWithOrdinal = `${winner.position + 1}${getOrdinalIndicator(winner.position + 1)}`;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center',
        alignItems: 'center', // Ensure alignment is centered
        width: '10vw', // Set a width for the entire container
      }}
    ><motion.div
        style={{
          alignSelf: 'center',
          marginBottom: '.25rem',
          width: '100%', // Ensure the name container doesn't exceed the width of the podium step
          whiteSpace: 'nowrap', // Prevent the name from wrapping
          overflow: 'hidden', // Hide overflow
          textOverflow: 'ellipsis', // Add an ellipsis for overflowed text
          textAlign: 'center', // Center align the text
        }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              delay: 1 + (offset + 2),
              duration: 0.75
            }
          },
          hidden: { opacity: 0 }
        }}
      ><span
          style={{
            fontFamily: 'Gras',
            letterSpacing: 1,
            fontSize: '1rem',
            color: 'white',
            textAlign: 'center', // Center align the text
          }}
        >
          {winner.name}
        </span><span
          style={{
            display: 'block',
            fontFamily: 'Normal',
            letterSpacing: 1,
            fontSize: '0.75rem',
            color: 'white',
            textAlign: 'center', // Center align the text
          }}
        >
          {winner.points} pts
        </span></motion.div><motion.div
        style={{
          width: '10vw', // This width should match the container's width
          placeContent: 'center',
          display: 'flex',
          borderTopLeftRadius: '.5rem',
          borderTopRightRadius: '.5rem',
          borderColor: 'rgba(190,24,93,1)',
          backgroundColor: 'rgba(235, 254, 114, 1)',
          marginBottom: 10,
          filter: `opacity(${0.1 + offset / podium.length})`
        }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            height: `calc(30vh * ${offset / podium.length})`,
            opacity: 1,
            transition: {
              delay: 1 + offset,
              duration: 2,
              ease: 'backInOut'
            }
          },
          hidden: { opacity: 0, height: 0 }
        }}
      ><span style={{fontFamily: 'Gras', color: 'black', alignSelf: 'flex-end', padding: '0.5rem' }}>
          {positionWithOrdinal}
        </span></motion.div></div>
  );
}