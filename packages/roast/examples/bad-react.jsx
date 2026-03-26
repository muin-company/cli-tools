import React from 'react';

// A React component with several issues
function UserProfile(props) {
  const [data, setData] = React.useState(null);
  
  // Fetching in render - bad idea
  fetch('/api/user/' + props.userId)
    .then(res => res.json())
    .then(json => setData(json));
  
  // No loading state
  return (
    <div onClick={() => {
      // Inline function in render - creates new function every time
      console.log('clicked');
    }}>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      {/* Rendering array without keys */}
      {data.posts.map(post => (
        <div>{post.title}</div>
      ))}
    </div>
  );
}

export default UserProfile;
