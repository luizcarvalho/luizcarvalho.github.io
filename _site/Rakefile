require 'rubygems'
require 'rake'
require 'yaml'
require 'time'
require 'pry'
require 'dotenv'
require 'dotenv/tasks'
require './lib/assets'
include Optimize
Dotenv.load

SOURCE = '.'.freeze

CONFIG = {
  'posts' => File.join(SOURCE, '_posts'),
  'post_ext' => 'md'
}.freeze

meses = {
  'January' => 'Janeiro', 'February' => 'Fevereiro', 'March' => 'Março', 'April' => 'Abril', 'May' => 'Maio', 'June' => 'Junho',
  'July' => 'Julho', 'August' => 'Agosto', 'September' => 'Setembro', 'October' => 'Outubro', 'November' => 'Novembro', 'December' => 'Dezembro'
}

# Usage: rake post title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]] [category="category"]
desc 'rake post title="A Title"'
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV['title'] || 'new-post'
  slug = title.downcase.strip.tr(' ', '_').gsub(/[^\w-]/, '')
  post_count = Dir["#{CONFIG['posts']}/*.md"].size
  date = Time.now.strftime('%Y-%m-%d')
  project_month = Time.now.strftime('%B')
  ano = Time.now.strftime('%Y')

  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  abort("post já existe!!") if File.exist?(filename)

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    binding.pry
    post.puts '---'
    post.puts "title: \"#{title}\""
    post.puts 'subtitle: '
    post.puts 'layout: default'
    post.puts "modal_id: #{post_count + 1}"
    post.puts "date: #{date}"
    post.puts "img: \"#{slug}\""
    post.puts 'link: '
    post.puts "project_date: #{meses[project_month]} de #{ano}"
    post.puts "prioridade: #{meses[project_month]} de #{ano}"
    post.puts 'client: '
    post.puts 'categories : []'
    post.puts 'description: '
    post.puts '---'
  end
end # task :post

namespace :assets do
  desc 'optimize png'
  task :optimize do
    Optimize.optimize
  end
end

# Load custom rake scripts
Dir['_rake/*.rake'].each { |r| load r }
