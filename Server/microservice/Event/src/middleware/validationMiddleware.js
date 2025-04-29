exports.validateEvent = (req, res, next) => {
  const { name, date, organizerID } = req.body;
  
  if (!name || !date) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide name and date for the event' 
    });
  }
  
  // If organizer is submitting, use their ID from token
  if (req.user.role === 'organizer') {
    req.body.organizerID = req.user.id;
  } 
  // If admin is creating on behalf of organizer, validate organizerID
  else if (req.user.role === 'admin' && !organizerID) {
    return res.status(400).json({
      success: false,
      message: 'Please provide organizerID when creating event as admin'
    });
  }
  
  next();
};

exports.validateSchedule = (req, res, next) => {
  const { stadiumID, eventID, date, timeStart, timeEnd } = req.body;
  
  if (!stadiumID || !eventID || !date || !timeStart || !timeEnd) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide stadiumID, eventID, date, timeStart, and timeEnd' 
    });
  }
  
  next();
};

exports.validateZone = (req, res, next) => {
  const { name, size, eventScheduleID, price, status } = req.body;
  
  if (!name || !size || !eventScheduleID || !price || !status) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide name, size, eventScheduleID, price, and status' 
    });
  }
  
  next();
};
