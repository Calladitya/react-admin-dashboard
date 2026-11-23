import { useMemo, useState } from 'react';
import { CalendarPlus, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react';
import './WorkspacePages.css';

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getEventsForMonth = (date) => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const scheduledDays = [
    { day: 4, title: 'Design team sync', time: '10:00 AM', color: '#7658e8' },
    { day: 9, title: 'Product review', time: '1:30 PM', color: '#3591e8' },
    { day: 15, title: 'Project kickoff', time: '11:00 AM', color: '#29a779' },
    { day: 22, title: 'Monthly planning', time: '2:00 PM', color: '#e59a38' },
  ];

  return scheduledDays
    .filter(({ day }) => day <= lastDay)
    .map((event) => ({
      ...event,
      id: `${date.getFullYear()}-${date.getMonth()}-${event.day}`,
      date: formatDateKey(new Date(date.getFullYear(), date.getMonth(), event.day)),
    }));
};

function Calendar() {
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [events, setEvents] = useState(() => getEventsForMonth(new Date()));
  const [showForm, setShowForm] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('10:00');

  const days = useMemo(() => {
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const mondayFirstOffset = (firstDay.getDay() + 6) % 7;
    return Array.from({ length: 42 }, (_, index) =>
      new Date(viewDate.getFullYear(), viewDate.getMonth(), index - mondayFirstOffset + 1)
    );
  }, [viewDate]);

  const selectedEvents = events.filter((event) => event.date === formatDateKey(selectedDate));
  const todayKey = formatDateKey(new Date());

  const moveMonth = (offset) => {
    const nextMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    setViewDate(nextMonth);
    setSelectedDate(nextMonth);
    setShowForm(false);
  };

  const handleAddEvent = (event) => {
    event.preventDefault();
    const title = eventTitle.trim();
    if (!title) return;

    const [hours, minutes] = eventTime.split(':').map(Number);
    const formattedTime = new Date(2000, 0, 1, hours, minutes).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    setEvents((currentEvents) => [
      ...currentEvents,
      {
        id: Date.now(),
        date: formatDateKey(selectedDate),
        title,
        time: formattedTime,
        color: '#7658e8',
      },
    ]);
    setEventTitle('');
    setShowForm(false);
  };

  return (
    <main className="workspace-page">
      <header className="workspace-header">
        <div>
          <p className="workspace-eyebrow">YOUR SCHEDULE</p>
          <h1>Calendar</h1>
          <p className="workspace-subtitle">Plan your work and keep every important date in view.</p>
        </div>
        <button
          className="workspace-primary-button"
          type="button"
          onClick={() => setShowForm((isOpen) => !isOpen)}
        >
          <CalendarPlus size={17} />
          Add event
        </button>
      </header>

      <section className="workspace-panel calendar-panel">
        <div className="calendar-toolbar">
          <div className="calendar-month-heading">
            <h2>{viewDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2>
            <button type="button" onClick={() => moveMonth(-1)} aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => moveMonth(1)} aria-label="Next month">
              <ChevronRight size={18} />
            </button>
          </div>
          <button
            className="workspace-secondary-button"
            type="button"
            onClick={() => {
              const now = new Date();
              setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
              setSelectedDate(now);
            }}
          >
            Today
          </button>
        </div>

        <div className="calendar-grid" role="grid" aria-label="Monthly calendar">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div className="calendar-weekday" role="columnheader" key={day}>{day}</div>
          ))}
          {days.map((day) => {
            const dateKey = formatDateKey(day);
            const hasEvents = events.some((event) => event.date === dateKey);
            const isCurrentMonth = day.getMonth() === viewDate.getMonth();
            const isSelected = dateKey === formatDateKey(selectedDate);
            const isToday = dateKey === todayKey;
            return (
              <button
                className={[
                  'calendar-day',
                  isCurrentMonth ? '' : 'is-outside-month',
                  isSelected ? 'is-selected' : '',
                  isToday ? 'is-today' : '',
                ].filter(Boolean).join(' ')}
                type="button"
                role="gridcell"
                key={dateKey}
                aria-label={day.toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
                aria-pressed={isSelected}
                onClick={() => setSelectedDate(day)}
              >
                <span>{day.getDate()}</span>
                {hasEvents && <i aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </section>

      <section className="workspace-panel calendar-agenda">
        <div className="workspace-panel-heading">
          <div>
            <h2>
              {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <p>{selectedEvents.length} {selectedEvents.length === 1 ? 'event' : 'events'} scheduled</p>
          </div>
        </div>

        {showForm && (
          <form className="workspace-form calendar-event-form" onSubmit={handleAddEvent}>
            <label>
              Event name
              <input
                autoFocus
                required
                value={eventTitle}
                onChange={(event) => setEventTitle(event.target.value)}
                placeholder="What are you planning?"
              />
            </label>
            <label>
              Time
              <input
                type="time"
                value={eventTime}
                onChange={(event) => setEventTime(event.target.value)}
              />
            </label>
            <button className="workspace-primary-button" type="submit">Save event</button>
          </form>
        )}

        <div className="calendar-event-list">
          {selectedEvents.length > 0 ? selectedEvents.map((event) => (
            <article className="calendar-event" key={event.id}>
              <span style={{ backgroundColor: event.color }} />
              <div><h3>{event.title}</h3><p><Clock3 size={14} /> {event.time}</p></div>
            </article>
          )) : (
            <p className="workspace-empty">Nothing planned for this day. Add an event to get started.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Calendar;
