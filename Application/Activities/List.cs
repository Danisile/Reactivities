using System.Collections.Generic;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Application.Core;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Results<List<Activity>>> { }

        public class Handler : IRequestHandler<Query, Results<List<Activity>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }
            public async Task<Results<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
               
                return Results<List<Activity>>.Success(await _context.Activities.ToListAsync(cancellationToken));
            }
        }


    }
}