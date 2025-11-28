<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Http\Response;

class NoteController extends Controller
{

    public function __construct()
    {
        // protect all routes of the controller by Sanctum
        $this->middleware('auth:sanctum');
    }
    
    /**
     * Get all notes (all users).
     */
    // public function getAllNotes(Request $request)
    // {
    //     // Get all notes with pagination
    //     $notes = Note::latest()->paginate(10);

    //     return response()->json([
    //         'data'  => $notes->items(), 
    //         'total' => $notes->total(), 
    //     ]);
    // }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get notes from users in the same company
        $notes = Note::with('user')
            ->whereHas('user', function ($query) use ($user) {
                $query->where('company_id', $user->company_id);
            })
            ->latest()
            ->paginate(10);

        return response()->json([
            'data'  => $notes->items(), 
            'total' => $notes->total(), 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $note = Note::create([
            'content' => $request->content,
            'user_id' => $request->user()->id
        ]);

        $note->load('user');

        return response()->json([
            'message' => 'Note created',
            'note'    => $note
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Note $note)
    {
        $user = $request->user();
        
        // check if the note belongs to a user in the same company
        $note->load('user');
        if ($note->user->company_id !== $user->company_id) {
            return response()->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        return response()->json($note);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        $user = $request->user();
        
        // check if the note belongs to a user in the same company
        $note->load('user');
        if ($note->user->company_id !== $user->company_id) {
            return response()->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        $note->update($request->all());
        $note->load('user');

        return response()->json([
            'message' => 'Note updated',
            'note'    => $note
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Note $note)
    {
        $user = $request->user();
        
        // check if the note belongs to a user in the same company
        $note->load('user');
        if ($note->user->company_id !== $user->company_id) {
            return response()->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        $note->delete();

        return response()->json(['message' => 'Note deleted']);
    }

}
