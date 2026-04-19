import type { Unit } from '../types';
import { introToProgramming } from './units/unit1/topics/intro-to-programming';
import { salientFeatures } from './units/unit1/topics/salient-features';
import { programStructure } from './units/unit1/topics/program-structure';
import { variables } from './units/unit1/topics/variables';
import { dataTypes } from './units/unit1/topics/data-types';
import { qualifiers } from './units/unit1/topics/qualifiers';
import { operatorsExpressions } from './units/unit1/topics/operators-expressions';
import { controlStructures } from './units/unit1/topics/control-structures';
import { ioFunctions } from './units/unit1/topics/io-functions';
import { languageBehaviors } from './units/unit1/topics/language-behaviors';
import { singleCharIo } from './units/unit1/topics/single-char-io';
import { codingStandards } from './units/unit1/topics/coding-standards';

import { arrays1d } from './units/unit2/topics/arrays-1d';
import { arrays2d } from './units/unit2/topics/arrays-2d';
import { pointers } from './units/unit2/topics/pointers';
import { pointerToArray } from './units/unit2/topics/pointer-to-array';
import { arrayOfPointers } from './units/unit2/topics/array-of-pointers';
import { functions } from './units/unit2/topics/functions';
import { callbacks } from './units/unit2/topics/callbacks';
import { storageClasses } from './units/unit2/topics/storage-classes';
import { recursion } from './units/unit2/topics/recursion';
import { searching } from './units/unit2/topics/searching';
import { sorting } from './units/unit2/topics/sorting';
import { strings as cStrings } from './units/unit3/topics/strings';
import { stringManipulation } from './units/unit3/topics/string-manipulation';
import { commandLineArgs } from './units/unit3/topics/command-line-args';
import { dynamicMemory } from './units/unit3/topics/dynamic-memory';
import { structures } from './units/unit3/topics/structures';
import { pragma } from './units/unit3/topics/pragma';
import { arrayOfStructures } from './units/unit3/topics/array-of-structures';
import { pointerToStructures } from './units/unit3/topics/pointer-to-structures';
import { bitFields } from './units/unit3/topics/bit-fields';
import { unions } from './units/unit3/topics/unions';
import { enums } from './units/unit3/topics/enums';
import { lists } from './units/unit3/topics/lists';
import { stack } from './units/unit3/topics/stack';
import { queue } from './units/unit3/topics/queue';
import { priorityQueue } from './units/unit3/topics/priority-queue';
import { fileIoRedirection } from './units/unit4/topics/file-io-redirection';
import { fileHandlingFunctions } from './units/unit4/topics/file-handling-functions';
import { fileSearchingSorting } from './units/unit4/topics/file-searching-sorting';
import { headerFiles } from './units/unit4/topics/header-files';
import { variableLengthArgs } from './units/unit4/topics/variable-length-args';
import { environmentVariables } from './units/unit4/topics/environment-variables';
import { preprocessorDirectives } from './units/unit4/topics/preprocessor-directives';
import { conditionalCompilation } from './units/unit4/topics/conditional-compilation';

export const curriculumMap: Unit[] = [
  {
    id: 'unit-1',
    number: 1,
    title: 'Problem Solving Fundamentals',
    slug: 'problem-solving-fundamentals',
    description: 'Introduction to programming concepts, C language basics, variables, operators, control flow, and I/O functions.',
    hours: 14,
    labIds: ['lab-1'],
    topics: [
      introToProgramming,
      salientFeatures,
      programStructure,
      variables,
      dataTypes,
      qualifiers,
      operatorsExpressions,
      controlStructures,
      ioFunctions,
      languageBehaviors,
      singleCharIo,
      codingStandards,
    ],
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'Counting, Sorting and Searching',
    slug: 'counting-sorting-searching',
    description: 'Arrays, pointers, functions, callbacks, storage classes, recursion, and fundamental algorithms.',
    hours: 14,
    labIds: ['lab-2'],
    topics: [
      arrays1d,
      arrays2d,
      pointers,
      pointerToArray,
      arrayOfPointers,
      functions,
      callbacks,
      storageClasses,
      recursion,
      searching,
      sorting,
    ],
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'Unit 3: Advanced Data Structures & Memory',
    slug: 'unit-3',
    description: 'Master manual memory management, structures, strings, and fundamental data structures like linked lists, stacks, and queues.',
    hours: 14,
    labIds: ['lab-3', 'lab-4', 'lab-7', 'lab-8', 'lab-9'],
    topics: [
      cStrings,
      stringManipulation,
      commandLineArgs,
      dynamicMemory,
      structures,
      pragma,
      arrayOfStructures,
      pointerToStructures,
      bitFields,
      unions,
      enums,
      lists,
      stack,
      queue,
      priorityQueue,
    ],
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'Unit 4: File I/O & Preprocessor',
    slug: 'unit-4',
    description: 'Interact with the operating system through file streams, redirection, environment variables, and master the C preprocessor.',
    hours: 14,
    labIds: ['lab-5', 'lab-6'],
    topics: [
      fileIoRedirection,
      fileHandlingFunctions,
      fileSearchingSorting,
      headerFiles,
      variableLengthArgs,
      environmentVariables,
      preprocessorDirectives,
      conditionalCompilation,
    ],
  },
];
