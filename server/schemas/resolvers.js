import { AuthenticationError } from '@apollo/server';
import { User, Post } from '../models';
import { signToken } from '../utils/auth';

