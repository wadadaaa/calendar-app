import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Modal from "../Modal";
import EventForm from "../EventForm";

const CalendarView = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    const response = await fetch("http://localhost:8000/events");
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handlePrevDay = () =>
    setDate(dayjs(date).subtract(1, "day").format("YYYY-MM-DD"));

  const handleNextDay = () =>
    setDate(dayjs(date).add(1, "day").format("YYYY-MM-DD"));

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // const handleDeleteEvent = (event) => {
  //   setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
  // };
  const handleDeleteEvent = async (event) => {
    const options = { method: "DELETE" };
    const response = await fetch(
      `http://localhost:8000/events/${event.id}`,
      options
    );

    if (response.ok) {
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
    }
  };
  // const handleSaveEvent = (event) => {
  //   if (selectedEvent) {
  //     setEvents((prevEvents) =>
  //       prevEvents.map((e) =>
  //         e.id === selectedEvent.id ? { ...e, ...event } : e
  //       )
  //     );
  //   } else {
  //     setEvents((prevEvents) => [
  //       ...prevEvents,
  //       {
  //         id: Math.random().toString(36).substring(2),
  //         ...event,
  //       },
  //     ]);
  //   }

  //   setShowModal(false);
  // };
  const handleSaveEvent = async (event) => {
    const options = {
      method: selectedEvent ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    };

    const url = selectedEvent
      ? `http://localhost:8000/events/${selectedEvent.id}`
      : "http://localhost:8000/events";

    const response = await fetch(url, options);
    const data = await response.json();

    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === selectedEvent.id ? { ...e, ...data } : e
        )
      );
    } else {
      setEvents((prevEvents) => [...prevEvents, data]);
    }

    setShowModal(false);
  };

  const eventForDate = events.find(
    (event) => dayjs(event.start).format("YYYY-MM-DD") === date
  );
  return (
    <div className="bg-slate-800 min-h-full rounded">
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-slate-600 rounded-full p-2 shadow-md hover:bg-slate-700 focus:outline-none"
            onClick={handlePrevDay}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="font-medium text-xl">
            {dayjs(date).format("dddd, MMMM D")}
          </h2>
          <button
            className="bg-slate-600 rounded-full p-2 shadow-md hover:bg-slate-700 focus:outline-none"
            onClick={handleNextDay}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="border-dashed border-2 border-gray-200 p-4 rounded-lg">
          {eventForDate ? (
            <div>
              <h3 className="font-medium text-lg mb-2">Today's Events</h3>
              <ul className="divide-y divide-gray-200">
                {events
                  .filter(
                    (event) => dayjs(event.start).format("YYYY-MM-DD") === date
                  )
                  .map((event) => (
                    <li key={event.id} className="py-2 border-t-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-gray-500">
                            {dayjs(event.start).format("h:mm A")}
                          </p>
                        </div>
                        <div>
                          <button
                            className="bg-violet-400 text-white px-2 py-1 rounded-md shadow-md mr-2 hover:bg-violet-600 focus:outline-none"
                            onClick={() => handleEditEvent(event)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
                            onClick={() => handleDeleteEvent(event)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <p>No events scheduled for today.</p>
          )}
          <button
            className="bg-violet-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-violet-600 focus:outline-none mt-4"
            onClick={handleAddEvent}
          >
            Add Event
          </button>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <EventForm
            date={date}
            onSubmit={handleSaveEvent}
            event={selectedEvent}
          />
        </Modal>
      )}
    </div>
  );
};

export default CalendarView;
