import { useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const EventForm = ({ date, onSubmit, event }) => {
  const [title, setTitle] = useState(event ? event.title : "");
  const [description, setDescription] = useState(
    event ? event.description : ""
  );
  const [startTime, setStartTime] = useState(
    event ? event.start : dayjs().startOf("hour").toDate()
  );
  const [endTime, setEndTime] = useState(
    event ? event.end : dayjs().startOf("hour").add(1, "hour").toDate()
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title,
      description,
      start: startTime,
      end: endTime,
    });

    setTitle("");
    setDescription("");
    setStartTime(dayjs().startOf("hour").toDate());
    setEndTime(dayjs().startOf("hour").add(1, "hour").toDate());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full dark:bg-gray-700 dark:border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full dark:bg-gray-700 dark:border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="start-time" className="block font-medium mb-1">
            Start Time
          </label>
          <input
            id="start-time"
            type="time"
            value={dayjs(startTime).format("HH:mm")}
            onChange={(event) =>
              setStartTime(dayjs(`${date} ${event.target.value}`).toDate())
            }
            className="w-full dark:bg-gray-700 dark:border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="end-time" className="block font-medium mb-1">
            End Time
          </label>
          <input
            id="end-time"
            type="time"
            value={dayjs(endTime).format("HH:mm")}
            onChange={(event) =>
              setEndTime(dayjs(`${date} ${event.target.value}`).toDate())
            }
            className="w-full dark:bg-gray-700 dark:border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded"
      >
        Save
      </button>
    </form>
  );
};
EventForm.propTypes = {
  date: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  event: PropTypes.object,
};

export default EventForm;
