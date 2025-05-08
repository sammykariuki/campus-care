import sqlite from 'better-sqlite3';

const db = sqlite('campus.db');

export default db;