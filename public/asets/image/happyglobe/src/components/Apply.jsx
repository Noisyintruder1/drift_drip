import React from 'react'

const Apply = () => {
  return (
    <div class="form-container">
      <h2>Job Application Form</h2>
        <form action="submit.php" method="POST" enctype="multipart/form-data">
          <label for="name">Full Name:</label>
          <input type="text" id="name" name="name" required/><br /><br />

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required/><br /><br />

          <label for="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" required/><br /><br />

          <label for="position">Job Applied For:</label>
          <input type="text" id="position" name="position" required/><br /><br />

          <label for="resume">Upload any file showing your education level:</label>
          <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required/><br /><br />

          <label for="message">Why should we hire you?</label>
          <textarea id="message" name="message" rows="4" required></textarea><br /><br />

          <button type="submit">Submit Application</button>
        </form>
    </div>
  )
}

export default Apply
