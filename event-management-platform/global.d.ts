
declare global {
  var mongoose: {
    conn: typeof import('mongoose') | null;
    promise: Promise | null;
  };
}

export {};
